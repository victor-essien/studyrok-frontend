import apiClient from "@/services/api/apiClient";
import { ENDPOINTS } from "@/services/api/endpoints";
import type { StudyBoard, CreateBoardPayload, BoardProgress, PaginatedResponse } from "@/types";


export const boardService = {
 // Get all boards
    async getBoards(page = 1, limit = 10): Promise<PaginatedResponse<StudyBoard>>{
        return apiClient.get(ENDPOINTS.boards.list, {
            params: {page, limit}
        })
    },
    // Get board by ID
  async getBoardById(id: string): Promise<StudyBoard> {
    return apiClient.get(ENDPOINTS.boards.detail(id));
  },

  // Create board from topic
  async createBoardFromTopic(payload: CreateBoardPayload): Promise<StudyBoard> {
    return apiClient.post(ENDPOINTS.boards.createFromTopic, payload);
  },

  // Create board from files
  async createBoardFromFiles(
    payload: CreateBoardPayload,
    onProgress?: (progress: number) => void
  ): Promise<StudyBoard> {
    const formData = new FormData();
    formData.append('topic', payload.topic);
    if (payload.title) formData.append('title', payload.title);
    if (payload.description) formData.append('description', payload.description);
    
    payload.files?.forEach((file) => {
      formData.append('files', file);
    });

    return apiClient.upload(ENDPOINTS.boards.createFromFiles, formData, onProgress);
  },

  // Update board
  async updateBoard(id: string, data: Partial<StudyBoard>): Promise<StudyBoard> {
    return apiClient.patch(ENDPOINTS.boards.update(id), data);
  },

  // Delete board
  async deleteBoard(id: string): Promise<void> {
    return apiClient.delete(ENDPOINTS.boards.delete(id));
  },

  // Get board progress
  async getBoardProgress(id: string): Promise<BoardProgress> {
    return apiClient.get(ENDPOINTS.boards.progress(id));
  },

  // Duplicate board
  async duplicateBoard(id: string): Promise<StudyBoard> {
    return apiClient.post(ENDPOINTS.boards.duplicate(id));
  },

  // Get public boards
  async getPublicBoards(): Promise<StudyBoard[]> {
    return apiClient.get(ENDPOINTS.boards.public);
  },

}