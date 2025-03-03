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
                         <div></div>
                ) 
                    : (
                        <div className={styles.form_content}>
                            <p className={styles.form_title_content}>Тоннаж месяц</p>
                            <div className={styles.wrapper_input}>
                                <div>
                                    <label 
                                        htmlFor="1"
                                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                                    >
                                        Тоннаж выставили
                                    </label>
                                    <CustomInput id={1} placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label 
                                        htmlFor="2"
                                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                                    >
                                        Ост. Порт
                                    </label>
                                    <CustomInput id={2} placeholder="Введите тн." />
                                </div>

                                <div>
                                    <label 
                                        htmlFor="3"
                                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                                    >
                                        Ост. ГиР
                                    </label>
                                    <CustomInput id={3} placeholder="Введите тн." />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </form>
    )
}