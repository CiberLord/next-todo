import style from '../styles/utils.module.css';

/* отоброжает один элемент */
export default function Item(props) {

    return (
        <li className={style.item}>
            <div className={style.itemLeft}>
                <button className={style.completeButton + ' ' + ((props.isCompleted === true) ? style.complete : "")} onClick={(ev) => { props.onCompleted(props.id) }}></button>
                <div className={style.itemContent+' ' + ((props.isCompleted === true) ? style.completeText : "")}>{props.content}</div>
            </div>
            <div className={style.itemRight}>
                <div className={style.itemDate}>{props.date}</div>
                <button className={style.deleteButton} onClick={(ev) => { props.onRemove(props.id) }}></button>
            </div>
        </li>
    )
}