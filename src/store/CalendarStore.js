import { create } from 'zustand';

const useDateStore = create((set) => ({
  date: new Date(),
  updateDate: (newDate) => set({ date: newDate }),
}));

export default useDateStore;

