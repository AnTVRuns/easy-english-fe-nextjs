import { get, post } from '@/lib/axios';
import {
  LoginPayload,
  GoogleLoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ResendOtpPayload,
  ResendOtpResponse,
} from '@/types/api/auth';

// NOTE: keep this path minimal ("/auth") so it composes correctly with
// `NEXT_PUBLIC_BASE_API_URL` that may already include an `/api` or `/api/v1` prefix.
const API_BASE = '/auth';

interface CurrentUser {
  role?: string;
  username?: string;
  email?: string;
  fullName?: string;
  accountStatus?: string;
  [key: string]: unknown;
}

/**
 * Login with username or email
 */
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await post(`${API_BASE}/login`, data);
  return response.data;
};

/**
 * Login with Google credential from Google Identity Services
 */
export const loginWithGoogle = async (data: GoogleLoginPayload): Promise<LoginResponse> => {
  const response = await post(`${API_BASE}/google-login`, data);
  return response.data;
};

/**
 * Get current user by stored token, matching the legacy app behavior.
 */
export const getCurUser = async (): Promise<CurrentUser | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  const tokenStr = localStorage.getItem('token');

  if (!tokenStr) {
    return null;
  }

  const response = await get(`${API_BASE}/get-user-by-token`, {
    params: { tokenStr },
  });

  return response?.status === 200 ? response.data : null;
};

/**
 * Register new account
 */
export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const response = await post(`${API_BASE}/register`, data);
  return response.data;
};

/**
 * Verify OTP for account verification or password reset
 */
export const verifyOtp = async (data: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  const response = await post(`${API_BASE}/verify-otp`, data);
  return response.data;
};

/**
 * Resend OTP to user
 */
export const resendOtp = async (data: ResendOtpPayload): Promise<ResendOtpResponse> => {
  const response = await post(`${API_BASE}/resend-otp`, data);
  return response.data;
};

/**
 * Generate OTP for password reset
 */
export const generateOtpForResetPassword = async (
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const response = await post(`${API_BASE}/forgot-password`, data);
  return response.data;
};

/**
 * Reset password with OTP
 */
export const resetPassword = async (
  data: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  const response = await post(`${API_BASE}/reset-password`, data);
  return response.data;
};
