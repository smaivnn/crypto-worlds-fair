import { create } from 'zustand';

interface User {
    name: string;
    gender: 'male' | 'female';
    email: string;
    calendarType: 'solar' | 'lunar';
    birthDate: string; // ISO string
    timeZone: string;
    birthLocation?: string;
    birthTime: string; // e.g., "08:30"
}

interface UserStore {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
