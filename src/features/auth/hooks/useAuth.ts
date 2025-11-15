import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useStore } from '@/store/store';
import type { SignupPayload, LoginPayload, OnboardingPayload } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Signup hook
export const useSignup = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  //  console.log('useSignup hook initialized, ', setUser);
  return useMutation({
    mutationFn: (payload: SignupPayload) => authService.signup(payload),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Account created successfully!');

      // Redirect based on onboarding status
      if (!data.user.onboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Signup failed');
    },
  });
};

// Login hook
export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Welcome back!');

      // Redirect based on onboarding status
      if (!data.user.onboarded) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

// Onboarding hook
export const useCompleteOnboarding = () => {
  const navigate = useNavigate();
  const updateUser = useStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (payload: OnboardingPayload) => authService.completeOnboarding(payload),
    onSuccess: (data) => {
      updateUser(data.user);
      toast.success("Onboarding completed! Let's start learning!");
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to complete onboarding');
    },
  });
};

// Get current user hook
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Logout hook
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/login');
    },
  });
};
