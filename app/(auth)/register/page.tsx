'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register as registerUser } from '@/api/auth';
import AuthShell from '@/components/Auth/AuthShell';
import type { RegisterPayload } from '@/types/api/auth';

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

type RegisterFormInputs = {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  phone: string | undefined;
  dob: string;
  gender: string;
};

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs, unknown, RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormValues) => {
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
      const message = error instanceof Error ? error.message : 'Register unsuccessfully';
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
      title="Create an account"
      subtitle={
        <>
          Start making your dreams come true.{' '}
          <Link href="/login" className="text-cyan-500 hover:text-cyan-600">
            Login
          </Link>
        </>
      }
      maxWidthClassName="max-w-[420px]"
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input {...register('fullName')} className={fieldClass(!!errors.fullName)} />
            {errors.fullName ? <p className="mt-1 text-sm text-rose-600">{errors.fullName.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
            <input {...register('username')} className={fieldClass(!!errors.username)} />
            {errors.username ? <p className="mt-1 text-sm text-rose-600">{errors.username.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={`${fieldClass(!!errors.password)} pr-16`}
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

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input {...register('email')} type="email" className={fieldClass(!!errors.email)} />
            {errors.email ? <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone number (Optional)</label>
            <input {...register('phone')} className={fieldClass(!!errors.phone)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Date of birth</label>
            <input {...register('dob')} type="date" className={fieldClass(!!errors.dob)} />
            {errors.dob ? <p className="mt-1 text-sm text-rose-600">{errors.dob.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Gender</label>
            <select {...register('gender')} className={fieldClass(!!errors.gender)} defaultValue="">
              <option value="" disabled>
                Select gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender ? <p className="mt-1 text-sm text-rose-600">{errors.gender.message}</p> : null}
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
            {isLoading ? 'Loading' : 'Register'}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
