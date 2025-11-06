import axios from 'axios';
import type  { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { ApiError, ApiResponse } from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token to requests
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log requests in development
        if (import.meta.env.DEV) {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log responses in development
        if (import.meta.env.DEV) {
          console.log(`[API Response] ${response.config.url}`, response.data);
        }

        return response;
      },
      async (error: AxiosError<ApiError>) => {
        // Handle errors
        if (error.response) {
          const { status, data } = error.response;

          // Handle 401 Unauthorized
          if (status === 401) {
            this.clearAuthToken();
            window.location.href = '/login';
          }

          // Handle 403 Forbidden
          if (status === 403) {
            console.error('Access forbidden');
          }

          // Handle 429 Too Many Requests
          if (status === 429) {
            console.error('Rate limit exceeded');
          }

          // Handle 500 Server Error
          if (status >= 500) {
            console.error('Server error occurred');
          }

          // Log errors in development
          if (import.meta.env.DEV) {
            console.error(`[API Error] ${error.config?.url}`, data);
          }

          // Return formatted error
          return Promise.reject({
            message: data?.message || 'An error occurred',
            statusCode: status,
            code: data?.code,
            errors: data?.errors,
          } as ApiError);
        }

        // Network error
        if (error.request) {
          return Promise.reject({
            message: 'Network error. Please check your connection.',
            statusCode: 0,
          } as ApiError);
        }

        // Other errors
        return Promise.reject({
          message: error.message || 'An unexpected error occurred',
          statusCode: 0,
        } as ApiError);
      }
    );
  }

  // Auth token management
  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('auth_token');
    }
    return this.authToken;
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('auth_token');
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data.data as T;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data.data as T;
  }

  // File upload with progress
  async upload<T = any>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    });
    return response.data.data as T;
  }

  // Get raw axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;