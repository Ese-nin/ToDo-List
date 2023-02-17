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
import {useActions} from "utils/useActions";
import {tasksActions, todoActions} from "state";

type PropsType = {
    id: string
    title: string
    tasks: TasksStateType
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export const Todolist = React.memo((props: PropsType) => {

    const {createTask} = useActions(tasksActions)
    const {changeTodolistTitle, deleteTodolist, changeTodolistFilterAC} = useActions(todoActions)


    const removeTodolist = () => deleteTodolist(props.id)

    const onButtonFilterClickHandler = useCallback((filter: FilterValuesType) =>
        changeTodolistFilterAC({filter, todolistId: props.id}), [props.id]);


    const renderFilterButton = (buttonsFilter: FilterValuesType, text: string) => {
        return <Button onClick={() => onButtonFilterClickHandler(buttonsFilter)}
                       variant={props.filter === buttonsFilter ? "contained" : "outlined"}
                       color="success"
                       size={'small'}>
            {text}
        </Button>
    }

    const addTask = useCallback((title: string) => {
        createTask({title, todolistID: props.id})
    }, [props.id])

    const changeTodoTitle = useCallback((title: string) => {
        changeTodolistTitle({todolistID: props.id, title})
    }, [props.id])

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
                        entityStatus={t.entityStatus}/>
                })
            }
        </ul>

    </div>
})