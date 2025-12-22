import { create } from 'zustand';

interface ModalState {
    isModalOpen: boolean;
    title: string;
    content: React.ReactNode | null;
    openModal: ({ title, content }: { title: string; content: React.ReactNode }) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    title: '',
    content: null,
    openModal: ({ title, content }: { title: string; content: React.ReactNode }) =>
        set({ isModalOpen: true, title, content }),
    closeModal: () => set({ isModalOpen: false, title: '', content: null }),
}));
