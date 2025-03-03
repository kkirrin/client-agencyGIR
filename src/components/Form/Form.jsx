import styles from './style.module.scss';


export default function Form({ title }) {
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
                        
                    </div>
                </div>
            </div>
        </form>
    )
}