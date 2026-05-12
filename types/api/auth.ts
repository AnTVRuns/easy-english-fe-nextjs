// Auth API Types
export interface LoginPayload {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      fullName: string;
    };
  };
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
}

export interface VerifyOtpPayload {
  username?: string;
  email?: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data?: {
    resetToken?: string;
  };
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  otp: string;
  email: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResendOtpPayload {
  username?: string;
  email?: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}
