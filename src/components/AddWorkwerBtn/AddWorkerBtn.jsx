import React, { useEffect } from 'react';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

import styles from './style.module.scss';

const useWorkerStore = create(
  persist(
    
    (set) => ({
      workers: [],
      addWorker: (newWorker) => set((state) => ({ workers: [...state.workers, newWorker] })),
      //Optional:  removeWorker, updateWorker etc.
    }),
    {
      name: 'worker-storage', // unique name for your storage
    }
  )
);

export default function AddWorkerBtn({ onAddWorker }) {

  const addWorker = useWorkerStore((state) => state.addWorker);
  const workers = useWorkerStore((state) => state.workers);

  useEffect(() => {
    //This is not strictly necessary if you use Zustand's persist.
    //It's here to demonstrate how you might fetch initial state from server
    //const fetchWorkers = async () => {
    //  const fetchedWorkers = await fetchWorkersFromServer(); //Your fetch function
    //  // Update Zustand store with fetched workers
    //  useWorkerStore.setState({ workers: fetchedWorkers });
    //};
    //fetchWorkers();

  }, []);


  const handleAddWorker = async () => {
    try {
      const newWorker = await onAddWorker(); 
      addWorker(newWorker);
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };


  return (
    <button onClick={handleAddWorker} className={styles.btn}>
      <img src='/add.svg' alt='' />
      <p className={styles.btn_text}>Добавить сотрудника</p>
    </button>
  );
}

