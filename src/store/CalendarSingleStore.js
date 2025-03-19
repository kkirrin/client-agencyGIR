import { create } from 'zustand';

const useDateSingleStore = create((set) => ({
  date: new Date(), 
  addDate: (newDate) => set({ date: newDate }), 
}));

export default useDateSingleStore;