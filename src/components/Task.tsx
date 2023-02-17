import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";
import {AppStatusType} from "state/app-reducer";
import {TaskStatuses} from "api/todolist-api";
import {useActions} from "utils/useActions";
import {tasksActions} from "state";

type TaskPropsType = {
    todoListID: string
    status: number
    taskID: string
    title: string
    entityStatus: AppStatusType
}

export const Task = React.memo((props: TaskPropsType) => {

    const {deleteTask, updateTask} = useActions(tasksActions)

    const onClickHandler = () => deleteTask({taskID: props.taskID, todolistId: props.todoListID})
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        updateTask({
            taskID: props.taskID,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todoListID
        });
    }

    const disable = props.entityStatus === 'loading'

    return <li>
        <Checkbox disabled={disable} onChange={onChangeStatusHandler}
                  checked={props.status === TaskStatuses.Completed}/>
        <EditableSpan entityStatus={props.entityStatus} title={props.title} callback={(title) => updateTask({
            taskID: props.taskID,
            domainModel: {title},
            todolistId: props.todoListID
        })}/>
        <IconButton disabled={disable} onClick={onClickHandler} color="secondary" title={'delete'}>
            <Fingerprint fontSize={'small'}/>
        </IconButton>
    </li>
})