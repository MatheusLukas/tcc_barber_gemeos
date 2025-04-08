import { create } from "zustand";

interface AuthStore {
	isLoggingOut: boolean;
	setIsLoggingOut: (isLoggingOut: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isLoggingOut: false,
	setIsLoggingOut: (isLoggingOut) => set({ isLoggingOut }),
}));
