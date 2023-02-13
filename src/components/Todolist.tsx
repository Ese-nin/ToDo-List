import React, {useCallback} from 'react';
import AddItem from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {Button, IconButton} from "@mui/material";
import {Fingerprint} from "@mui/icons-material";
import {TasksStateType} from "state/tasks-reducer";
import {FilterValuesType} from "state/todolists-reducer";
import {AppStatusType} from "state/app-reducer";
import {TaskStatuses} from "api/todolist-api";

type PropsType = {
    id: string
    title: string
    tasks: TasksStateType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    entityStatus: AppStatusType
}

export const Todolist = React.memo((props: PropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onButtonFilterClickHandler = useCallback((filter: FilterValuesType) =>
        props.changeFilter(filter, props.id), [props.changeFilter, props.id]);


    const renderFilterButton = (buttonsFilter: FilterValuesType, text: string) => {
        return <Button onClick={() => onButtonFilterClickHandler(buttonsFilter)}
                       variant={props.filter === buttonsFilter ? "contained" : "outlined"}
                       color="success"
                       size={'small'}>
            {text}
        </Button>
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        props.changeTaskTitle(props.id, taskID, title)
    }, [props.changeTaskTitle, props.id])

    let tasks = props.tasks[props.id]
    if (props.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (props.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

    return <div>
        <h3>
            <EditableSpan entityStatus={props.entityStatus} title={props.title}
                          callback={(title) => changeTodoTitle(title)}/>
            <IconButton disabled={props.entityStatus === 'loading'} onClick={removeTodolist} aria-label="fingerprint"
                        color="secondary" title={'delete'}
            style={{position: "absolute", top: "5px", right: "5px"}}>
                <Fingerprint/>
            </IconButton>
        </h3>
        <AddItem entityStatus={props.entityStatus} callback={addTask}/>

        <div style={{marginTop: '15px'}}>

            {renderFilterButton('all', 'All')}
            {renderFilterButton('active', 'Active')}
            {renderFilterButton('completed', 'Completed')}

        </div>
        <ul>
            {
                tasks.map(t => {
                    return <Task
                        key={t.id}
                        todoListID={props.id}
                        taskID={t.id}
                        status={t.status}
                        title={t.title}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        entityStatus={t.entityStatus}/>
                })
            }
        </ul>

    </div>
})