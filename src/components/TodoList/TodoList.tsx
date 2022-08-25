import React from 'react';
import Button from "../Button/Button";
import {TasksValueType} from "../../App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    filteredTasks: (value: TasksValueType) => void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <Button name="+" callBack={() => {}}/>
            <div style={{marginLeft: "20px"}}>
                <Button name="All" callBack={() => props.filteredTasks("all")}/>
                <Button name="Active" callBack={() => props.filteredTasks("active")}/>
                <Button name="Completed" callBack={() => props.filteredTasks("completed")}/>
            </div>
            <ul>
                {props.tasks.map((t, index) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name="del" callBack={()=>props.removeTask(t.id)}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default TodoList;