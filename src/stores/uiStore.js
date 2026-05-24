import { create } from 'zustand';

export const useUiStore = create((set, get) => ({
  theme: localStorage.getItem('blinkx-theme') || 'dark',

  tickerMode: localStorage.getItem('blinkx-ticker-mode') ?? 'blinkx',

  setTickerMode: (mode) => {
    localStorage.setItem('blinkx-ticker-mode', mode);
    set({ tickerMode: mode });
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('blinkx-theme', theme);
    set({ theme });
  },

  toasts: [],

  addToast: (message, type = 'positive') => {
    const id = Date.now();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 4300);
  },

  removeToast: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
}));
