import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {taskType} from "../Redux/State";
import Button from "./Button";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    tasks: Array<taskType>
    title: string
    filter: FilterValuesType
    removeTask: (id: string) => void
    tasksForTodoList: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const tasksList = props.tasks.length ?
        props.tasks.map(t => {
            return (
                <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input onChange={(e) => props.changeStatus(t.id, e.currentTarget.checked)}
                           type="checkbox"
                           checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name="del" callBack={() => props.removeTask(t.id)}/>
                </li>
            )
        }) : <span>Empty</span>

    const buttonHandler = (value: FilterValuesType) => {
        return () => props.tasksForTodoList(value)
    }

    const buttonPlusTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle);
        } else {
            setError(true);
        }

        setTitle("")
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false);
        if (e.key === "Enter") buttonPlusTask();
    }

    const errorMessage = <div className={"error-message"}>Field empty</div>

    return (
        <div style={{marginLeft: "100px"}}>
            <h3>{props.title}</h3>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}/>
            <Button name="+" callBack={buttonPlusTask}/>
            {error && errorMessage}
            <div style={{marginLeft: "15px"}}>

                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={buttonHandler("all")}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={buttonHandler("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={buttonHandler("completed")}>Completed
                </button>

                {/*<Button name="All" callBack={buttonHandler("all")}/>
                <Button name="Active" callBack={buttonHandler("active")}/>
                <Button name="Completed" callBack={buttonHandler("completed")}/>*/}

            </div>
            <ol>
                {tasksList}
            </ol>
        </div>
    );
};

export default TodoList;