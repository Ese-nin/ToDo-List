import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import Button from "../Button/Button";
import {TasksValueType} from "../../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filteredTasks: (value: TasksValueType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('');

    const tasksItems = props.tasks.length
        ? props.tasks.map(t => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name="del" callBack={() => props.removeTask(t.id)}/>
                </li>
            )
        }) : <span>Task list is empty</span>

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskButton(title);
        }
    }

    const addTaskButton = (title: string) => {
        props.addTask(title);
        setTitle('');
    }

    const filterButton = (filter: TasksValueType) => {
        return () => props.filteredTasks(filter)
    }

    return (
        <div style={{marginLeft: "100px"}}>
            <h3>{props.title}</h3>

            <input value={title}
                   onChange={changeTitle}
                   onKeyDown={onKeyDownAddTask}/>

            <Button name="+"
                    callBack={() => addTaskButton(title)}/>

            <div style={{marginLeft: "20px"}}>
                <Button name="All" callBack={filterButton("all")}/>
                <Button name="Active" callBack={filterButton("active")}/>
                <Button name="Completed" callBack={filterButton("completed")}/>
            </div>
            <ul>
                {tasksItems}
            </ul>
        </div>
    );
};

export default TodoList;