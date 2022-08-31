import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksType} from "../../Redux/State";
import Button from "../Button/Button";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    title: string
    tasks: TasksType
    removeTask: (id: string) => void
    tasksForTodoList: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState('')

    const tasksList = props.tasks.length
        ? props.tasks.map((t, index) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name="del" callBack={() => props.removeTask(t.id)}/>
            </li>
        )
    }) : <span>empty</span>

    const buttonAll = () => {
        props.tasksForTodoList('all')
    }
    const buttonActive = () => {
        props.tasksForTodoList('active')
    }
    const buttonCompleted = () => {
        props.tasksForTodoList('completed')
    }
    const buttonPlus = () => {
        props.addTask(title);
        setTitle('')
    }
    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const keyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") buttonPlus()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input value={title}
                   onChange={changeInput}
                   onKeyDown={keyDownInput}/>
            <Button name="+" callBack={buttonPlus}/>
            <div>
                <Button name="All" callBack={buttonAll}/>
                <Button name="Active" callBack={buttonActive}/>
                <Button name="Completed" callBack={buttonCompleted}/>
            </div>
            <ol>{tasksList}</ol>
        </div>
    );
};

export default TodoList;