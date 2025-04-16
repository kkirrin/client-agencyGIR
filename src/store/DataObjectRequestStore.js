import { create } from 'zustand';

const useDataObjectRequestStore = create((set) => ({
    dataObject: [],
    setDataObjectRequest: (newData) => set({ data: newData }),
    clearDataObject : () => set({ data: [] }),
}))

export default useDataObjectRequestStore;