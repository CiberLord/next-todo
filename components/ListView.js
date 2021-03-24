import style from '../styles/utils.module.css';

/* компонент отображает список элементов  */
export default function ListView(props){
    return(
        <div className={style.listview}>
            <ul className={style.list}>
                {props.children}
            </ul>
        </div>
    )
}