import styles from './style.module.scss';
export default function AddWorkerBtn({ onAddWorker }) {

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

