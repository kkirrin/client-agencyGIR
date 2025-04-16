import styles from './style.module.scss';
import { useState } from 'react';
import { MiniAddPopupContent } from '../../components';

export default function ComponentTonnaj({ idObject }) {

    const [activeTonnajPopup, setActiveTonnajPopup] = useState(false);

    const handleClick = () => {
        setActiveTonnajPopup(true)
    }

    return (
        <>
            <div>
                <button onClick={handleClick}>
                    Тоннаж
                </button>

                <MiniAddPopupContent active={activeTonnajPopup} setActive={setActiveTonnajPopup} id={idObject} />
            </div>
        </>
    )
}