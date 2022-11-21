import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";

type TaskPropsType = {
    todoListID: string
    taskID: string
    isDone: boolean
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.taskID, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskID, newIsDoneValue, props.todoListID);
    }

    return <li>
        <Checkbox onChange={onChangeHandler} checked={props.isDone} />
        <EditableSpan title={props.title} callback={(title)=>props.changeTaskTitle(props.taskID, title)}/>
        <IconButton onClick={onClickHandler} aria-label="fingerprint" color="secondary">
            <Fingerprint />
        </IconButton>
    </li>
})