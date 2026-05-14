"use client";

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateOtpForResetPassword } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';
import { Box, Button, Input, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

type ForgotPasswordFormInputs = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: yupResolver(forgotPasswordSchema) as unknown as Resolver<ForgotPasswordFormInputs>,
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await generateOtpForResetPassword({ email: data.email });

      if (response.success) {
        setMessage({ type: 'success', text: 'Otp sent to email successfully' });
        setTimeout(() => router.push('/reset-password'), 1200);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to send OTP' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to send OTP';
      setMessage({ type: 'error', text: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we&apos;ll send you a code to reset your password"
      footer={
        <Stack spacing={2}>
          <ChakraLink as={NextLink} href="/login" color="cyan.400">
            Back to login
          </ChakraLink>
          <ChakraLink as={NextLink} href="/register" color="cyan.400">
            Create new account
          </ChakraLink>
        </Stack>
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
                Email
              </Text>
              <Input {...register('email')} type="email" size="lg" borderRadius="xl" borderColor={errors.email ? 'red.500' : 'gray.300'} />
              {errors.email ? <Text mt={1} fontSize="sm" color="red.600">{errors.email.message}</Text> : null}
            </Box>

            <Button type="submit" loading={isLoading} loadingText="Loading" width="full" size="lg" borderRadius="xl" bg="cyan.600" color="white" _hover={{ bg: 'cyan.700' }} _disabled={{ bg: 'gray.400', cursor: 'not-allowed' }}>
              Reset Password
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthShell>
  );
}
