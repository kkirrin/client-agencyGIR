import styles from './style.module.scss';

export default function NoteBody({ active, setActive, data, date }) {

    const Job = data?.Job;
    const Name = data?.Name;
    const createdAt = data?.createdAt;
    const documentId = data?.documentId;

    const dateWorkered = data?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaDateDetails;
    const Note = data?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.Note;
    const SmenaDataTonnaj = data?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaDataTonnaj;
    const SmenaStatusWorker = data?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.SmenaStatusWorker;
    const TC = data?.DayDataDetails[0]?.DayInfo?.SmenaDetails?.TC;

    const id = data?.id;

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setActive(false);
        }
    }

    return (

        <div
            className={`${styles.popup} ${active ? styles.popupActive : styles.popupNone}`}
            onClick={() => { setActive(false) }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className={`${styles.popup__body} ${styles.popup__body__note}`} id={id}>

                <div
                    className={styles.popup__content}
                    onClick={e => e.stopPropagation()}
                >

                    <button
                        className={styles.popup__close}
                        onClick={() => { setActive(false) }}
                    >
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                            <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                        </svg>
                    </button>
                    <div>
                        <h3 className={styles.name_worker_name}>{Name}</h3>
                        <p className={styles.name_worker_job}>{Job}</p>
                        <p className={styles.name_worker_date}>{date}</p>
                        <p className={styles.name_worker_status}>{SmenaStatusWorker}</p>

                        <div className={styles.name_worker_note}>
                            <p className={styles.note_title}>Примечание</p>
                            <div className={styles.name_worker_note_back}>
                                <p className=''>{Note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}