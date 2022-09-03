import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {taskType} from "../Redux/State";
import Button from "./Button";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    tasks: Array<taskType>
    title: string
    removeTask: (id: string) => void
    tasksForTodoList: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState("")

    const tasksList = props.tasks.length ?
        props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button name="del" callBack={() => props.removeTask(t.id)}/>
            </li>
        )
    }) : <span>Empty</span>

    const buttonHandler = (value: FilterValuesType) => {
        props.tasksForTodoList(value)
    }

    const buttonPlusTask = () => {
        props.addTask(title);
        setTitle("")
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") buttonPlusTask()
    }

    return (
        <div style={{marginLeft: "100px"}}>
            <h3>{props.title}</h3>
            <input value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownInputHandler}/>
            <Button name="+" callBack={buttonPlusTask}/>
            <div style={{marginLeft: "15px"}}>
                <Button name="All" callBack={() => buttonHandler("all")}/>
                <Button name="Active" callBack={() => buttonHandler("active")}/>
                <Button name="Completed" callBack={() => buttonHandler("completed")}/>
            </div>
            <ol>
                {tasksList}
            </ol>
        </div>
    );
};

export default TodoList;