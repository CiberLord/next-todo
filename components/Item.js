import style from '../styles/utils.module.css';

/* отоброжает один элемент */
export default function Item(props){

    return (
        <li className={style.item}>
            <button  className={(props.isCompleted===true)?style.comp:style.uncomp} onClick={(ev)=>{props.onCompleted(props.id)}}>{(props.isCompleted===true)?"completed":"uncompleted"}</button>
            <div className={style.itemContent}>{props.content}</div>
            <div className={style.itemDate}>{props.date}</div>
            <button className={style.removeItem} onClick={(ev)=>{props.onRemove(props.id)}}>remove</button>
        </li>
    )
}