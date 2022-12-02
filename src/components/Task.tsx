import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";
import {TaskStatuses} from "../api/task-api";
import {AppStatusType} from "../state/app-reducer";

type TaskPropsType = {
    todoListID: string
    status: number
    taskID: string
    title: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskID: string, title: string) => void
    entityStatus: AppStatusType
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.taskID, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.taskID, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID);
    }

    const disable = props.entityStatus === 'loading'

    return <li>
        <Checkbox disabled={disable} onChange={onChangeHandler} checked={props.status === TaskStatuses.Completed} />
        <EditableSpan entityStatus={props.entityStatus} title={props.title} callback={(title)=>props.changeTaskTitle(props.taskID, title)}/>
        <IconButton disabled={disable} onClick={onClickHandler} aria-label="fingerprint" color="secondary">
            <Fingerprint />
        </IconButton>
    </li>
})