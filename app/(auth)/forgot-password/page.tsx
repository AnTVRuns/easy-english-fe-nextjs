'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateOtpForResetPassword } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';

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
    resolver: yupResolver(forgotPasswordSchema),
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
        <div className="space-y-2">
          <div>
            <Link href="/login" className="text-cyan-500 hover:text-cyan-600">
              Back to login
            </Link>
          </div>
          <div>
            <Link href="/register" className="text-cyan-500 hover:text-cyan-600">
              Create new account
            </Link>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {message ? (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              {...register('email')}
              type="email"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-500 ${
                errors.email ? 'border-rose-500' : 'border-slate-300'
              }`}
            />
            {errors.email ? <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-cyan-600 px-6 py-4 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Loading' : 'Reset Password'}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
