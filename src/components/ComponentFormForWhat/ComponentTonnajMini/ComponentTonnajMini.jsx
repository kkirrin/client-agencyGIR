import styles from './style.module.scss';
import { CustomInput } from "../../../components";

export default function ComponentTonnajMini({ data, errors, register }) {
    return (
        <div className={`${styles.form_content} ${styles.mini}`}>
            <p className={styles.form_title_content}>Тоннаж месяц</p>
            <div className={styles.wrapper_input}>
                <div>
                    <label
                        htmlFor="1"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Тоннаж выставили
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        name={'AmountData'}
                        id={1}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>

                <div>
                    <label
                        htmlFor="2"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Ост. Порт
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        name={'DayDataOstatkiPORT'}
                        id={2}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>

                <div>
                    <label
                        htmlFor="3"
                        style={{ textAlign: 'start', fontWeight: 'medium' }}
                    >
                        Ост. ГиР
                    </label>
                    <CustomInput
                        data={data}
                        errors={errors}
                        register={register}
                        id={3}
                        name={'DayDataOstatkiGIR'}
                        type="number"
                        placeholder="Введите тн."
                    />
                </div>
            </div>
        </div>
    )
}