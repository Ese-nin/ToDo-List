import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    todolistID: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    filterTasks: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const taskList = props.tasks.length ?
        props.tasks.map(t => {

            const removeTaskButton = () => {
                props.removeTask(props.todolistID, t.id)
            }

            const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(props.todolistID, t.id, e.currentTarget.checked)
            }

            return (
                <li key={t.id}>
                    <input
                        onChange={onChangeCheckbox}
                        type="checkbox"
                        checked={t.isDone}/>

                    <span>{t.title}</span>

                    <button onClick={removeTaskButton}>del</button>

                </li>
            )
        }) : <span>list empty</span>

    const errorMessage = error ?
        <div className={error ? "error-message" : ""}>
            Field is empty
        </div> : false

    const filterAllButton = () => {
        props.filterTasks(props.todolistID, "all")
    }
    const filterActiveButton = () => {
        props.filterTasks(props.todolistID, "active")
    }
    const filterCompletedButton = () => {
        props.filterTasks(props.todolistID, "completed")
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTaskButton()
    }

    const addTaskButton = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID, title.trim())
            setTitle("")
        } else setError(true)
    }

    const removeTodolistButton = () => {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button
                    onClick={removeTodolistButton}>x
                </button>
            </h3>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}/>
            <button
                className={error ? "error-button" : ""}
                onClick={addTaskButton}>+
            </button>
            {errorMessage}
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={filterAllButton}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={filterActiveButton}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={filterCompletedButton}>Completed
                </button>
            </div>
            <ul>
                {taskList}
            </ul>
        </div>
    );
};

export default Todolist;