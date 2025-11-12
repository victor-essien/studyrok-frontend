import type { User } from "@/types";
// Auth types
export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OnboardingPayload {
  userId: string;
  studyObjective?: string;
  educationLevel?: string; 

}

export interface AuthResponse {
  user: User;
  token: string;
}
