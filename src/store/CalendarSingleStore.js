import { create } from 'zustand';

const useDateSingeStore = create((set) => ({
  date: new Date(), 
  addDate: (newDate) => set({ date: newDate }), 
}));

export default useDateSingeStore;