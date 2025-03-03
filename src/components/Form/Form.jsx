import styles from './style.module.scss';

import { BtnSave, CustomInput } from '../../components';

export default function Form({ title, forWhat }) {
    return (
        <form
            action=""
        >
            <div>
                <div className={styles.form_header}>
                    <div>
                        <h2 className={styles.form_title}>
                            {title} 
                        </h2>
                    </div>

                    <div className={styles.form_title_info}>
                        <div className={styles.btn_save_wrapper}>
                            <BtnSave />
                        </div>
                    </div>
                </div>

                
                {forWhat === 'tech' ? (
                        <div className={styles.form_content}>
                            <p>Тоннаж месяц</p>
                            <div className={styles.wrapper_input}>
                                <div>
                                    <label htmlFor="">Тоннаж выставили</label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label htmlFor="">Ост. Порт</label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label htmlFor="">Ост. ГиР</label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>
                            </div>
                        </div>
                ) 
                    : (
                        <div className={styles.form_content}>
                            <p>Тоннаж месяц</p>
                            <div className={styles.wrapper_input}>
                                <div>
                                    <label 
                                        htmlFor=""
                                        style={{ textAlign: 'start' }}
                                    >
                                        Тоннаж выставили
                                    </label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label 
                                        htmlFor=""
                                        style={{ textAlign: 'start' }}
                                    >
                                        Ост. Порт
                                    </label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label 
                                        htmlFor=""
                                        style={{ textAlign: 'start' }}
                                    >
                                        Ост. ГиР
                                    </label>
                                    <CustomInput placeholder="Введите тн." />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </form>
    )
}