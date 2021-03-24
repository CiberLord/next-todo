import style from '../styles/utils.module.css';

/* компонент отвечает за отображение нижней панели */
export default function Footer(props) {
    let len = 0;
    for (let e of props.todo){
        if (e.completed === true) len++
    }
    console.log(props.show);
    return (
        <div className={style.footer}>
            <div className={style.completeCount}>done <span className={style.doneNum}>{len}</span></div>
            <div className={style.footerWrap}>
                <button className={style.footerBtn+' '+((props.show==="uncompleted")?style.selected:'')}  onClick={props.showUncompleted}>Not done</button>
                <button className={style.footerBtn+' '+((props.show==="all")?style.selected:'')} onClick={props.showAll}>All</button>
            </div>
        </div>
    )
}