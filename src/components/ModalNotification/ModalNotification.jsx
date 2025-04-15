import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';

export default function ModalNotification({ active }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (active) {
        // Анимация прогрессбара
        const timer = setInterval(() => {
            setProgress((prev) => {
            if (prev >= 100) {
                clearInterval(timer);
                return 100;
            }
            return prev + 1;
            });
        }, 30);

        //   const reloadTimer = setTimeout(() => {
        //     window.location.reload();
        //   }, 3000);

        //   return () => {
        //     clearInterval(timer);
        //     clearTimeout(reloadTimer);
        //   };
        }
  } , [active]);

    return (
        <motion.div
        className={`${styles.modalNotificationWrapper} ${active ? styles.active : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        >
        <div className={styles.modalContent}>
            Модалка
            {/* Прогрессбар */}
            <motion.div
            className={styles.progressBar}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
            />
        </div>
        </motion.div>
    );
}