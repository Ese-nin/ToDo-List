import React, {useCallback} from 'react';
import AddItem from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {Button, IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";
import {FilterValuesType} from "./TodoListsList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        props.changeTaskTitle(props.id, taskID, title)
    }, [props.changeTaskTitle, props.id])

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={(title) => changeTodoTitle(title)}/>
            <IconButton onClick={removeTodolist} aria-label="fingerprint" color="secondary">
                <Fingerprint/>
            </IconButton>
        </h3>
        <AddItem callback={addTask}/>
        <div style={{marginTop: '15px'}}>
            <Button onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? "contained" : "outlined"}
                    color="success"
                    size={'small'}>
                All
            </Button>
            <Button onClick={onActiveClickHandler}
                variant={props.filter === 'active' ? "contained" : "outlined"}
                    color="success"
                    size={'small'}>
                Active
            </Button>
            <Button onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? "contained" : "outlined"}
                    color="success"
                    size={'small'}>
                Completed
            </Button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <Task
                        key={t.id}
                        todoListID={props.id}
                        taskID={t.id}
                        isDone={t.isDone}
                        title={t.title}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}/>
                })
            }
        </ul>

    </div>
})