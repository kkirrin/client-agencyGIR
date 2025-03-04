import { create } from 'zustand';

const useDateStore = create((set) => ({
  // Изначальное состояние – текущая дата
  date: new Date(),
  // Функция для обновления даты
    updateDate: () => set({ date: new Date('MMMM y') }),
}));

export default useDateStore;