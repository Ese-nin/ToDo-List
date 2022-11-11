import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    todoListID: string
    taskID: string
    isDone: boolean
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const Task = (props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.taskID, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskID, newIsDoneValue, props.todoListID);
    }

    return <li className={props.isDone ? "is-done" : ""}>
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone}/>
        <EditableSpan title={props.title} callback={(title)=>props.changeTaskTitle(props.taskID, title)}/>
        <button onClick={onClickHandler}>x</button>
    </li>
}