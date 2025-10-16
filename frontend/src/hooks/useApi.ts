// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import apiClient from '../api/axiosConfig';
import { AxiosError } from 'axios';

// Định nghĩa kiểu cho các giá trị trả về từ hook
interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// Hook sẽ trả về trạng thái và một hàm để thực hiện gọi API
export const useApi = <T>() => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async (url: string) => {
    setState({ data: null, isLoading: true, error: null });
    try {
      const response = await apiClient.get<{ data: T }>(url);
      setState({ data: response.data.data, isLoading: false, error: null });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setState({ data: null, isLoading: false, error: errorMessage });
      console.error('API Error:', err);
    }
  }, []);

  return { ...state, fetchData };
};