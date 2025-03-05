// import { create } from 'zustand';

// const useDateStore = create((set) => ({
//   date: new Date(),
//   updateDate: (newDate) => set({ date: newDate }),
// }));

// export default useDateStore;


import { create } from 'zustand';

const useDateStore = create((set) => ({
  dates: [], // Инициализируем массив для хранения нескольких дат
  updateDates: (newDates) => set({ dates: newDates }), // Обновляем массив дат
}));

export default useDateStore;