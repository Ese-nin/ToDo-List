import React from 'react';
import Button from "../Button/Button";
import {FilterValueType} from "../../App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <Button name={"+"} callBack={()=>{}}/>
            <div style={{marginLeft: "15px"}}>
                <Button name={"All"} callBack={()=>props.changeFilter("All")}/>
                <Button name={"Active"} callBack={()=>props.changeFilter("Active")}/>
                <Button name={"Completed"} callBack={()=>props.changeFilter("Completed")}/>
            </div>
            <ul>
                {props.tasks.map((t, index) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={"del"} callBack={()=>props.removeTask(t.id)}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default TodoList;