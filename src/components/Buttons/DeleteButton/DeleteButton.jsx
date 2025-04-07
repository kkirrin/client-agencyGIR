import styles from './style.module.scss';
import { useParams } from 'react-router-dom';
import useDataRequestStore from './../../../store/DataRequestStore';

export default function DeleteButton({ setActive }) {
    const { data, clearData } = useDataRequestStore();
    const userId = data[0]?.documentId;
    const { id } = useParams();
    let url;

    switch (id) {
        case '12': {
            url = `http://89.104.67.119:1337/api/techicas/${userId}`;
        }
            break;
        case '10': {
            url = `http://89.104.67.119:1337/api/drobilkas/${userId}`;
        }
            break;

        default: {
            url = `http://89.104.67.119:1337/api/people/${userId}`;
        }
            break;
    }

    const deleteHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (window.confirm("Вы точно хотите удалить пользователя?")) {
                setActive(false);
                window.location.reload();
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            // console.log(`Пользователь с ID ${userId} успешно удалён.`);
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <button className={styles.btn_delete} onClick={deleteHandle}>
            Удалить запись
        </button>
    )
}