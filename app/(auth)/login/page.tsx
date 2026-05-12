'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';
import type { LoginPayload } from '@/types/api/auth';

const loginSchema = yup.object({
  usernameOrEmail: yup.string().required('Username or email is required'),
  password: yup.string().required('Password is required'),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const payload: LoginPayload = { password: data.password };

      if (data.usernameOrEmail.includes('@')) {
        payload.email = data.usernameOrEmail;
      } else {
        payload.username = data.usernameOrEmail;
      }

      const response = await login(payload);

      if (response.success && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage({ type: 'success', text: 'Login successfully' });
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Login unsuccessfully' });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login unsuccessfully';
      setMessage({ type: 'error', text: message });
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
          <Link href="/register" className="text-cyan-500 hover:text-cyan-600">
            Register
          </Link>
        </>
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Username Or Email</label>
            <input
              {...register('usernameOrEmail')}
              type="text"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-cyan-500 ${
                errors.usernameOrEmail ? 'border-rose-500' : 'border-slate-300'
              }`}
            />
            {errors.usernameOrEmail ? (
              <p className="mt-1 text-sm text-rose-600">{errors.usernameOrEmail.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className={`w-full rounded-xl border px-4 py-3 pr-16 outline-none transition focus:ring-2 focus:ring-cyan-500 ${
                  errors.password ? 'border-rose-500' : 'border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-cyan-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password ? <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p> : null}
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-cyan-500 hover:text-cyan-600">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-cyan-600 px-6 py-4 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Loading' : 'Login'}
          </button>

          <div className="flex items-center gap-4 pt-2">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-600">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
            disabled
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
