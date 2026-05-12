'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { resetPassword } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';

const resetPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Confirm password is required'),
});

type ResetPasswordFormInputs = yup.InferType<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await resetPassword({
        email: data.email,
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (response.success) {
        setMessage({ type: 'success', text: response.message || 'Password reset successfully' });
        setTimeout(() => router.push('/login'), 1200);
      } else {
        setMessage({ type: 'error', text: response.message || 'Could not reset password' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Could not reset password';
      setMessage({ type: 'error', text: message });
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (hasError?: boolean) =>
    `w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-500 ${
      hasError ? 'border-rose-500' : 'border-slate-300'
    }`;

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter the code from your email and your new password"
      footer={
        <div className="space-y-2">
          <div>
            <Link href="/login" className="text-cyan-500 hover:text-cyan-600">
              Back to login
            </Link>
          </div>
          <div>
            <Link href="/forgot-password" className="text-cyan-500 hover:text-cyan-600">
              Request new code
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input {...register('email')} type="email" className={fieldClass(!!errors.email)} />
            {errors.email ? <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Verification Code</label>
            <input
              {...register('otp')}
              maxLength={6}
              className={`${fieldClass(!!errors.otp)} text-center text-lg tracking-[0.5em]`}
            />
            {errors.otp ? <p className="mt-1 text-sm text-rose-600">{errors.otp.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>
            <input {...register('newPassword')} type="password" className={fieldClass(!!errors.newPassword)} />
            {errors.newPassword ? <p className="mt-1 text-sm text-rose-600">{errors.newPassword.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className={fieldClass(!!errors.confirmPassword)}
            />
            {errors.confirmPassword ? (
              <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-2xl bg-cyan-600 px-6 py-4 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Loading' : 'Reset Password'}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
