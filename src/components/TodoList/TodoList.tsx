import React from 'react';
import Button from "../Button/Button";
import {FilterValueType} from "../../App";

export type TasksProps = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksProps>
    removeTasks: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <Button name="+" callBack={()=>{}}/>
            <div>
                <Button name="All" callBack={()=>props.changeFilter("All")}/>
                <Button name="Active" callBack={()=>props.changeFilter("Active")}/>
                <Button name="Completed" callBack={()=>props.changeFilter("Completed")}/>
            </div>
            <ol>
                {props.tasks.map((t, index)=>{
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span> {t.title} </span>
                            <Button name="del" callBack={()=>props.removeTasks(t.id)}/>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default TodoList;