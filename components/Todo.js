import { useState, useEffect } from 'react';
import style from '../styles/utils.module.css';
import Form from './Form';
import ListView from './ListView';
import Item from './Item';
import Footer from './Footer';


const url = '/api/getuser';

export default function Todo(props) {
    let [todo, setList] = useState([]); //список задач
    let [showtype, setShow] = useState("all"); //какой тип элементов отобразить (все/невыполенный)
    let [blocking, setBlocking] = useState(false);
    const userId = getClientId(); //идентификатор клиента 

    //загрузка начальных данных с сервера
    useEffect(() => {
        let request = {
            userid: userId,
            action: "init" //тип действия который должен обработать сервер
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        }).then(res => res.json()).then(json => {
            setList(getList(json));
        })
    }, []);



    /*обработчки событий*/

    //добавить новую задачу
    const addTodo = (value) => {
        if (blocking === false) {
            setBlocking(true);
            let request = {
                userid: userId,
                action: "add",
                content: value,
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(request)
            }).then(res => res.json()).then(json => {
                let list = [...todo];
                list.push({
                    id: json.id,
                    task: value,
                    completed: false,
                    date: json.date
                })
                setList(list);
                setBlocking(false);
            })
        }
    }

    //запрос для отметки выполненной задачи
    const onCompleted = (id) => {
        if (blocking === false) {
            setBlocking(true);
            if (todo[id].completed === false) {
                let request = {
                    userid: userId,
                    action: "complete",
                    taskid: todo[id].id
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(request)
                }).then(res => {
                    if (res.status === 200)
                        setBlocking(false);
                })

                let list = [...todo];
                list[id].completed = true;
                setList(list);
            }
        }
    }
    //запрос на удаления задачи
    const onRemove = (id) => {
        if (blocking === false) {
            setBlocking(true);
            let request = {
                userid: userId,
                action: "delete",
                taskid: todo[id].id
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(request)
            }).then(res => {
                if (res.status === 200)
                    setBlocking(false);
            })
            let list = [...todo];
            list = list.filter((item, index) => {
                return (index !== id) ? true : false;
            })
            setList(list);
        }
    }

    // список задач помещается как дочерние элементы компонента listview
    let filter = [...todo];
    if (showtype === "uncompleted") {
        filter = todo.filter((item, index) => {
            return (item.completed === false) ? true : false
        })
    }
    let Items = filter.map((item, index) => {
        return (
            <Item
                key={index}
                id={index}
                onCompleted={onCompleted}
                onRemove={onRemove}
                isCompleted={item.completed}
                content={item.task}
                date={item.date}

            />
        )
    })

    //покзаать только не выполненные задачи
    const showUncomp = (ev) => {
        setShow("uncompleted");
    }
    //показать все задачи
    const showAll = (ev) => {
        setShow("all");
    }

    return (
        <div className={style.todo}>
            <Form onSubmit={addTodo} />
            <ListView>
                {Items}
            </ListView>
            <Footer todo={todo} showUncompleted={showUncomp} showAll={showAll} show={showtype}/>
        </div>
    )
}

// получает локальный айди клиента, если нет, то сооздает новый айди и отправляет на сервер (еще не реализовано)
function getClientId() {
    return 1;
}
//получить список элементов по json ответу
function getList(json) {
    let list = [];
    for (let id in json) {
        list.push({
            id: json[id].id,
            completed: json[id].completed,
            date: json[id].date,
            task: json[id].task
        });
    }
    return list;
}