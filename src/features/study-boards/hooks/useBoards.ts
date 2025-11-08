import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boardService } from '../services/boardServices';
import { queryKeys } from '@/lib/reactQuery';
import type { CreateBoardPayload, StudyBoard } from '@/types';
import toast from 'react-hot-toast';

// Get all boards
export const useBoards = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: queryKeys.boards.list({ page, limit }),
    queryFn: () => boardService.getBoards(page, limit),
  });
};

// Get single board
export const useBoard = (id: string) => {
  return useQuery({
    queryKey: queryKeys.boards.detail(id),
    queryFn: () => boardService.getBoardById(id),
    enabled: !!id,
  });
};

// Create board from topic
export const useCreateBoardFromTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBoardPayload) => boardService.createBoardFromTopic(payload),
    onSuccess: (data) => {
      // Invalidate boards list
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.all });

      // Optimistically add to cache
      queryClient.setQueryData(queryKeys.boards.detail(data.id), data);

      toast.success('Study board created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create study board');
    },
  });
};

// Create board from files
export const useCreateBoardFromFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      onProgress,
    }: {
      payload: CreateBoardPayload;
      onProgress?: (progress: number) => void;
    }) => boardService.createBoardFromFiles(payload, onProgress),
    onSuccess: (data) => {
      // Invalidate boards list
      queryClient.invalidateQueries({ queryKey: queryKeys.boards.all });

      // Optimistically add to cache
      queryClient.setQueryData(queryKeys.boards.detail(data.id), data);

      toast.success('Study board created from files successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create study board from files');
    },
  });
};
