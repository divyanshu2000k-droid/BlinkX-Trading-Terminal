import { create } from 'zustand';

const defaultGroup = () => ({ symbol: null, timeframe: null });

export const useLinkStore = create((set, get) => ({
  groups: {
    red: defaultGroup(),
    blue: defaultGroup(),
    green: defaultGroup(),
    yellow: defaultGroup(),
  },

  setSymbol: (groupId, symbol) => {
    set((s) => ({
      groups: {
        ...s.groups,
        [groupId]: { ...s.groups[groupId], symbol },
      },
    }));
  },

  setTimeframe: (groupId, timeframe) => {
    set((s) => ({
      groups: {
        ...s.groups,
        [groupId]: { ...s.groups[groupId], timeframe },
      },
    }));
  },

  getGroup: (groupId) => get().groups[groupId],
}));
