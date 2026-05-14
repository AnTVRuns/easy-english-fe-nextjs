'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as ChakraLink, Text } from '@chakra-ui/react';
import * as yup from 'yup';
import { getCurUser, login, loginWithGoogle } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';
import type { LoginPayload } from '@/types/api/auth';

const USER_ROLES = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;

const USER_STATUSES = {
  INACTIVE: 'INACTIVE',
} as const;

const normalizeRole = (role?: string) => (role || '').toUpperCase().replace(/^ROLE_/, '');

const getRedirectPathByRole = (role?: string) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === USER_ROLES.STUDENT) return '/learn';
  if (normalizedRole === USER_ROLES.TEACHER) return '/teacher/courses';
  if (normalizedRole === USER_ROLES.ADMIN) return '/admin/courses';
  return '/';
};

const loginSchema = yup.object({
  usernameOrEmail: yup.string().trim().required('Username or email is required'),
  password: yup.string().trim().required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const navigateByRole = useCallback(
    (role?: string) => {
      const targetPath = getRedirectPathByRole(role);

      if (process.env.NODE_ENV === 'development') {
        console.debug('[login redirect]', { role, normalizedRole: normalizeRole(role), targetPath });
      }

      router.replace(targetPath);
    },
    [router],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    getCurUser()
      .then((user) => {
        if (user) {
          navigateByRole(user.role);
        }
      })
      .catch(() => {
        localStorage.clear();
      });
  }, [navigateByRole]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      return;
    }

    const loadGoogleScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.google?.accounts?.id) {
          resolve();
          return;
        }

        const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-identity="true"]');

        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('Failed to load Google script')));
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.dataset.googleIdentity = 'true';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google script'));
        document.head.appendChild(script);
      });

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            if (!response.credential) {
              return;
            }

            localStorage.clear();
            setIsGoogleLoading(true);
            setMessage(null);

            try {
              const result = await loginWithGoogle({ credential: response.credential });

              if (result?.accountStatus === USER_STATUSES.INACTIVE) {
                setMessage({ type: 'error', text: 'The account has not confirmed OTP' });
                router.push(`/otp-validation?username=${encodeURIComponent(result.data?.user?.email || '')}`);
                return;
              }

              if (result.success && result.data?.token) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('user', JSON.stringify(result.data.user));
                setMessage({ type: 'success', text: 'Login successfully' });
                navigateByRole(result.data.user?.role);
              } else {
                setMessage({ type: 'error', text: result.message || 'Login unsuccessfully' });
              }
            } catch {
              setMessage({ type: 'error', text: 'Failed to login with Google' });
            } finally {
              setIsGoogleLoading(false);
            }
          },
        });
      })
      .catch(() => {
        // keep the button usable even if Google script is unavailable
      });

    return () => {
      cancelled = true;
    };
  }, [navigateByRole, router]);

  const handleGoogleLogin = () => {
    setMessage(null);

    if (!window.google?.accounts?.id) {
      setMessage({ type: 'error', text: 'Google login is not ready yet' });
      return;
    }

    setIsGoogleLoading(true);
    window.google.accounts.id.prompt();
  };

  const onSubmit = async (data: LoginFormInputs) => {
    localStorage.clear();
    setIsLoading(true);
    setMessage(null);

    try {
      const usernameOrEmail = data.usernameOrEmail.trim();
      const password = data.password.trim();

      const payload: LoginPayload = { usernameOrEmail, password };

      const response = await login(payload as unknown as LoginPayload);

      if (response?.accountStatus === USER_STATUSES.INACTIVE) {
        router.push(`/otp-validation?username=${encodeURIComponent(usernameOrEmail)}`);
        return;
      }

      if (response.success && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (process.env.NODE_ENV === 'development') {
          console.debug('[login success]', {
            role: response.data.user?.role,
            normalizedRole: normalizeRole(response.data.user?.role),
            user: response.data.user,
          });
        }
        setMessage({ type: 'success', text: 'Login successfully' });
        navigateByRole(response.data.user?.role);
      } else {
        setMessage({ type: 'error', text: response.message || 'Login unsuccessfully' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login unsuccessfully';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login in to your account"
      subtitle={
        <>
          Don&apos;t have an account?{' '}
          <ChakraLink as={NextLink} href="/register" color="cyan.400">
            Register
          </ChakraLink>
        </>
      }
    >
      <Box display="block">
        {message ? (
          <Box
            borderRadius="xl"
            px={4}
            py={3}
            fontSize="sm"
            bg={message.type === 'success' ? 'emerald.50' : 'rose.50'}
            color={message.type === 'success' ? 'emerald.700' : 'rose.700'}
          >
            {message.text}
          </Box>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={5} mt={4}>
            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Username Or Email
              </Text>
              <input
                {...register('usernameOrEmail')}
                type="text"
                style={{
                  width: '100%',
                  borderRadius: '0.75rem',
                  border: `1px solid ${errors.usernameOrEmail ? '#ef4444' : '#d1d5db'}`,
                  padding: '0.5rem 0.75rem',
                  outline: 'none',
                }}
              />
              {errors.usernameOrEmail ? (
                <Text mt={1} fontSize="sm" color="red.600">
                  {errors.usernameOrEmail.message}
                </Text>
              ) : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Password
              </Text>
              <Box position="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  style={{
                    width: '100%',
                    borderRadius: '0.75rem',
                    border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
                    padding: '0.5rem 4.5rem 0.5rem 0.75rem',
                    outline: 'none',
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((value) => !value)}
                  color="cyan.700"
                  position="absolute"
                  right={3}
                  top="50%"
                  transform="translateY(-50%)"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </Box>
              {errors.password ? (
                <Text mt={1} fontSize="sm" color="red.600">
                  {errors.password.message}
                </Text>
              ) : null}
            </Box>

            <Box textAlign="right">
              <ChakraLink as={NextLink} href="/forgot-password" color="cyan.400" fontSize="sm">
                Forgot password?
              </ChakraLink>
            </Box>

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Loading"
              width="full"
              size="lg"
              borderRadius="xl"
              bg="cyan.600"
              color="white"
              _hover={{ bg: 'cyan.700' }}
              _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}
            >
              Login
            </Button>

            <Box display="flex" alignItems="center" gap={4} pt={2}>
              <Box h="1px" flex="1" bg="gray.200" />
              <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                or continue with
              </Text>
              <Box h="1px" flex="1" bg="gray.200" />
            </Box>

            <Box display="flex" justifyContent="center" pt={1}>
              <Button
                type="button"
                onClick={handleGoogleLogin}
                loading={isGoogleLoading}
                loadingText="Loading"
                width="200px"
                size="lg"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
                bg="white"
                color="gray.700"
                _hover={{ bg: 'gray.50', shadow: 'xl' }}
                _focus={{ boxShadow: 'outline' }}
                _active={{ bg: 'gray.100' }}
              >
                <Box display="flex" alignItems="center" gap={3}>
                  <Image src="/google-icon.svg" alt="Google Icon" width={20} height={20} />
                  <Text>Sign in with Google</Text>
                </Box>
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthShell>
  );
}
