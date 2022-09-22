import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItem} from "./components/AddItem";
import {EditableSpan} from "./components/EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskID: string) => void
    filterTasks: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, value: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    editTaskTitle: (todoListID: string, taskID: string, currentTitle: string) => void
    editTodoListTitle: (todoListID: string, currentTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const {todoListID, title, tasks, removeTask, filterTasks, filter, addTask,
        changeStatus, removeTodoList, editTaskTitle, editTodoListTitle} = props

    const tasksList = tasks.length ?
        tasks.map(t => {

            const onClickHandler = () => {
                removeTask(todoListID, t.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatus(todoListID, t.id, e.currentTarget.checked)
            }

            const editSpanHandler = (currentTitle: string) => {
                editTaskTitle(todoListID, t.id, currentTitle)
            }

            return (
                <li className={t.isDone ? "is-done" : ""} key={t.id}>
                    <input
                        onChange={onChangeHandler}
                        type="checkbox"
                        checked={t.isDone}/>
                    <EditableSpan callback={(currentTitle)=>editSpanHandler(currentTitle)} title={t.title}/>
                    <button onClick={onClickHandler}>del</button>
                </li>
            )
        }) : <span>Empty</span>

    const allButtonHandler = () => {
        filterTasks(todoListID, "all")
    }
    const activeButtonHandler = () => {
        filterTasks(todoListID, "active")
    }
    const completedButtonHandler = () => {
        filterTasks(todoListID, "completed")
    }

    const removeTodoButtonHandler = () => {
        removeTodoList(todoListID)
    }

    const addItemHandler = (value: string) => {
        addTask(todoListID, value)
    }

    const editTodoTitle = (currentTitle: string) => {
        editTodoListTitle(todoListID, currentTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan callback={(currentTitle)=>editTodoTitle(currentTitle)} title={title}/>
                <button onClick={removeTodoButtonHandler}>x</button>
            </h3>
            <AddItem
                addItem={(value) => addItemHandler(value)}/>
            <div>
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={allButtonHandler}>All
                </button>
                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={activeButtonHandler}>Active
                </button>
                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={completedButtonHandler}>Completed
                </button>
            </div>
            <ul>
                {tasksList}
            </ul>
        </div>
    );
};