import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {taskType} from "../Redux/State";
import Button from "./Button";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    tasks: Array<taskType>
    title: string
    filter: FilterValuesType
    addTask: (value: string) => void
    removeTask: (taskID: string) => void
    tasksForTodoList: (filter: FilterValuesType) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState(false)


    const taskList = props.tasks.length ?
        props.tasks.map(t => {

            const removeTaskButton = (id: string) => {
                props.removeTask(id)
            }

            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(t.id, e.currentTarget.checked)
            }

            return (
                <li className={t.isDone ? "is-done" : ""}
                    key={t.id}>
                    <input onChange={changeStatus}
                           type="checkbox"
                           checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name="del" callBack={() => removeTaskButton(t.id)}/>
                </li>
            )
        }) : <span>Empty</span>

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false)
        if (e.key === "Enter") addTaskButton()
    }

    const addTaskButton = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else setError(true)
    }

    const filterButton = (value: FilterValuesType) => {
        props.tasksForTodoList(value)
    }

    const errorMessage = <div className={error ? "error-message" : ""}>
        {error ? "Field empty" : ""}</div>

    return (
        <div style={{marginLeft: "150px"}}>
            <h3 style={{marginLeft: "15px"}}>{props.title}</h3>

            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}/>

            <Button name="+" callBack={addTaskButton}/>

            {errorMessage}

            <div style={{marginLeft: "15px"}}>

                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => filterButton("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => filterButton("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => filterButton("completed")}>Completed
                </button>

                {/*<Button name="All" callBack={() => filterButton("all")}/>
                <Button name="Active" callBack={() => filterButton("active")}/>
                <Button name="Completed" callBack={() => filterButton("completed")}/>*/}

            </div>
            <ul>
                {taskList}
            </ul>
        </div>
    );
};

export default TodoList;