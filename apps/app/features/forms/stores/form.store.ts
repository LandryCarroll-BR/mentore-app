'use client';

import { create } from 'zustand';

interface FormStore {
  data: Record<string, string>;
  setData: (data: Record<string, string>) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  data: {},
  setData: (data) => {
    set({ data });
  },
}));
