import { post } from '@/lib/axios';
import {
  LoginPayload,
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

const API_BASE = '/api/auth';

/**
 * Login with username or email
 */
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await post(`${API_BASE}/login`, data);
  return response.data;
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
