import style from '../styles/utils.module.css';

/* компонент отвечает за отображение нижней панели */
export default function Footer(props) {
    let len = 0;
    for (let e of props.todo){
        if (e.completed === true) len++
    }

    return (
        <div className={style.footer}>
            <div className={style.completeCount}>{len}</div>
            <div>
                <button onClick={props.showUncompleted}>uncompleted</button>
                <button onClick={props.showAll}>all</button>
            </div>
        </div>
    )
}