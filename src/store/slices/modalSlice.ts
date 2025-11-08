import type { StateCreator } from 'zustand';

export type ModalType =
  | 'createBoard'
  | 'editBoard'
  | 'deleteBoard'
  | 'createFlashcard'
  | 'editFlashcard'
  | 'generateFlashcards'
  | 'generateQuiz'
  | 'generateNotes'
  | 'generateVideo'
  | 'shareBoard'
  | 'settings'
  | 'profile'
  | 'subscription'
  | 'fileUpload'
  | null;

export interface ModalState {
  activeModal: ModalType;
  modalData: any;
  isModalOpen: boolean;
}

export interface ModalActions {
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  updateModalData: (data: any) => void;
}

export type ModalSlice = ModalState & ModalActions;

const initialState: ModalState = {
  activeModal: null,
  modalData: null,
  isModalOpen: false,
};

export const createModalSlice: StateCreator<ModalSlice, [['zustand/devtools', never]]> = (set) => ({
  ...initialState,

  openModal: (type, data = null) => {
    set(
      {
        activeModal: type,
        modalData: data,
        isModalOpen: true,
      },
      false,
      `modal/open/${type}`
    );
  },

  closeModal: () => {
    set(
      {
        activeModal: null,
        modalData: null,
        isModalOpen: false,
      },
      false,
      'modal/close'
    );
  },

  updateModalData: (data) => {
    set(
      (state) => ({
        modalData: { ...state.modalData, ...data },
      }),
      false,
      'modal/updateData'
    );
  },
});