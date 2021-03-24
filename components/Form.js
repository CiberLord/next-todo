import { useRef } from 'react';
import style from '../styles/utils.module.css';

/* компонент отвечает за отображение формы  */

export default function Form(props){
    const input=useRef(null);

    const onSubmit=(ev)=>{
        ev.preventDefault();
        props.onSubmit(input.current.value);
        input.current.value="";
    }

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <input ref={input} placeholder="what need to do"/>
            <button className={style.submitButton} onClick={onSubmit}>add</button>
        </form>
    )
}