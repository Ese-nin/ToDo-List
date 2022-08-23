import React from 'react';
import Button from "../Button/Button";
import {FilterValuesType} from "../../App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) =>void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <Button title={"+"} callBack={() => {
            }}/>
            <div>
                <Button title={"All"} callBack={()=>props.changeFilter("All")}/>
                <Button title={"Active"} callBack={()=>props.changeFilter("Active")}/>
                <Button title={"Completed"} callBack={()=>props.changeFilter("Completed")}/>
            </div>
            <ol>
                {props.tasks.map((t, index) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title={"del"} callBack={()=>props.removeTask(t.id)}/>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default TodoList;