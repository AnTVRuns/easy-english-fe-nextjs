"use client";

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register as registerUser } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';
import type { RegisterPayload } from '@/types/api/auth';
import { Box, Button, Input, Stack, Text, Flex, Link as ChakraLink } from '@chakra-ui/react';

const registerSchema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().optional(),
  dob: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
});

type RegisterFormInputs = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema) as unknown as Resolver<RegisterFormInputs>,
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const payload: RegisterPayload = {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        dateOfBirth: data.dob,
        gender: data.gender,
      };

      const response = await registerUser(payload);

      if (response.success) {
        setMessage({ type: 'success', text: response.message || 'Register successfully' });
        setTimeout(() => router.push('/verify-otp'), 1200);
      } else {
        setMessage({ type: 'error', text: response.message || 'Register unsuccessfully' });
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Register unsuccessfully';
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create an account"
      subtitle={
        <>
          Start making your dreams come true.{' '}
          <ChakraLink as={NextLink} href="/login" color="cyan.400">
            Login
          </ChakraLink>
        </>
      }
    >
      <Stack gap={6} align="stretch">
        {message ? (
          <Box borderRadius="xl" px={4} py={3} fontSize="sm" bg={message.type === 'success' ? 'emerald.50' : 'rose.50'} color={message.type === 'success' ? 'emerald.700' : 'rose.700'}>
            {message.text}
          </Box>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={5} align="stretch">
            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Full name
              </Text>
              <Input {...register('fullName')} size="lg" borderRadius="xl" borderColor={errors.fullName ? 'red.500' : 'gray.300'} />
              {errors.fullName ? <Text mt={1} fontSize="sm" color="red.600">{errors.fullName.message}</Text> : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Username
              </Text>
              <Input {...register('username')} size="lg" borderRadius="xl" borderColor={errors.username ? 'red.500' : 'gray.300'} />
              {errors.username ? <Text mt={1} fontSize="sm" color="red.600">{errors.username.message}</Text> : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Password
              </Text>
              <Input {...register('password')} type="password" size="lg" borderRadius="xl" borderColor={errors.password ? 'red.500' : 'gray.300'} />
              {errors.password ? <Text mt={1} fontSize="sm" color="red.600">{errors.password.message}</Text> : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Confirm Password
              </Text>
              <Input {...register('confirmPassword')} type="password" size="lg" borderRadius="xl" borderColor={errors.confirmPassword ? 'red.500' : 'gray.300'} />
              {errors.confirmPassword ? <Text mt={1} fontSize="sm" color="red.600">{errors.confirmPassword.message}</Text> : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Email
              </Text>
              <Input {...register('email')} type="email" size="lg" borderRadius="xl" borderColor={errors.email ? 'red.500' : 'gray.300'} />
              {errors.email ? <Text mt={1} fontSize="sm" color="red.600">{errors.email.message}</Text> : null}
            </Box>

            <Box>
              <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Phone number (Optional)
              </Text>
              <Input {...register('phone')} size="lg" borderRadius="xl" borderColor={errors.phone ? 'red.500' : 'gray.300'} />
            </Box>

            <Flex gap={4}>
              <Box flex={1}>
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  Date of birth
                </Text>
                <Input {...register('dob')} type="date" size="lg" borderRadius="xl" borderColor={errors.dob ? 'red.500' : 'gray.300'} />
                {errors.dob ? <Text mt={1} fontSize="sm" color="red.600">{errors.dob.message}</Text> : null}
              </Box>

              <Box width="40%">
                <Text as="label" display="block" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                  Gender
                </Text>
                <Box
                  as="select"
                  {...register('gender')}
                  borderRadius="xl"
                  borderColor={errors.gender ? 'red.500' : 'gray.300'}
                  height="3rem"
                  px={3}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Box>
                {errors.gender ? <Text mt={1} fontSize="sm" color="red.600">{errors.gender.message}</Text> : null}
              </Box>
            </Flex>

            <Button type="submit" loading={isLoading} loadingText="Loading" width="full" size="lg" borderRadius="xl" bg="cyan.600" color="white" _hover={{ bg: 'cyan.700' }} _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}>
              Register
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthShell>
  );
}
