'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { resendOtp, verifyOtp } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';

const verifyOtpSchema = yup.object({
  email: yup.string().email('Invalid email').optional(),
  username: yup.string().optional(),
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});

type VerifyOtpFormInputs = {
  email: string | undefined;
  username: string | undefined;
  otp: string;
};

type VerifyOtpFormValues = yup.InferType<typeof verifyOtpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<VerifyOtpFormInputs, unknown, VerifyOtpFormValues>({
    resolver: yupResolver(verifyOtpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: VerifyOtpFormValues) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await verifyOtp({
        otp: data.otp,
        email: data.email || undefined,
        username: data.username || undefined,
      });

      if (response.success && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage({ type: 'success', text: response.message || 'Validate OTP successfully' });
        setTimeout(() => router.push('/login'), 1000);
      } else {
        setMessage({ type: 'error', text: response.message || 'OTP validation failed' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'OTP validation failed';
      setMessage({ type: 'error', text: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = getValues('email');
    const username = getValues('username');

    if (!email && !username) {
      setMessage({ type: 'error', text: 'Please enter email or username first' });
      return;
    }

    setIsResending(true);
    try {
      const response = await resendOtp({ email: email || undefined, username: username || undefined });

      if (response.success) {
        setMessage({ type: 'success', text: 'OTP sent successfully!' });
        setResendTimer(60);
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Could not resend OTP' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Could not resend OTP';
      setMessage({ type: 'error', text: message });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthShell
      title="Validate OTP"
      subtitle="Please enter the OTP sent to your email"
      footer={
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="text-cyan-500 hover:text-cyan-600">
            Go to Register
          </Link>
          <Link href="/login" className="text-cyan-500 hover:text-cyan-600">
            Go to Login
          </Link>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">OTP</label>
            <input
              {...register('otp')}
              inputMode="numeric"
              maxLength={6}
              className={`w-full rounded-xl border px-4 py-3 text-center tracking-[0.5em] outline-none transition focus:ring-2 focus:ring-cyan-500 ${
                errors.otp ? 'border-rose-500' : 'border-slate-300'
              }`}
            />
            {errors.otp ? <p className="mt-1 text-sm text-rose-600">{errors.otp.message}</p> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input {...register('email')} type="email" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
              <input {...register('username')} className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-cyan-600 px-6 py-4 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Validating' : 'Validate OTP'}
          </button>

          <div className="text-center">
            <span className="text-sm text-slate-600">Didn&apos;t receive the OTP? </span>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending || resendTimer > 0}
              className="text-sm font-medium text-cyan-500 hover:text-cyan-600 disabled:text-slate-400"
            >
              {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
            </button>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
