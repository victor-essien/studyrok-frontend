import apiClient from "@/services/api/apiClient";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { LoginPayload, SignupPayload, AuthResponse, OnboardingPayload} from "../types/auth.types";
import type { User } from "@/types";
export const authService = {
// Signup
    async signup(payload: SignupPayload):Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(
            ENDPOINTS.auth.signup,
            payload
        );

        // Store token
        if (response.token) {
            apiClient.setAuthToken(response.token)
        }

        return response;
    },

    //Login 
    async login(payload:LoginPayload): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse> (
            ENDPOINTS.auth.login,
            payload
        );

        if (response.token) {
            apiClient.setAuthToken(response.token)
        }
        return response;
    },
      async completeOnboarding(payload: OnboardingPayload): Promise<{ user: User }> {
        console.log('Payload in authService:', payload);
    return apiClient.post('/auth/onboarding', payload);
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    return apiClient.get(ENDPOINTS.auth.me);
  },

  // Logout
  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.auth.logout);
    apiClient.clearAuthToken();
  },
}


