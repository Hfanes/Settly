import { create } from "zustand";

interface SettingsState {
  folderPath: string | null;
  setFolderPath: (path: string) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  folderPath: null,
  setFolderPath: (path) => set({ folderPath: path }),
}));
