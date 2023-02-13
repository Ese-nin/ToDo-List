import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import AddItem from "./AddItem";
import {useAppDispatch, useAppSelector} from "store/store";
import {createTask, deleteTask, updateTask} from "state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitle,
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    FilterValuesType,
} from "state/todolists-reducer";
import {TaskStatuses, TodolistDomainType} from "api/todolist-api";
import {AppStatusType} from "state/app-reducer";
import {Navigate} from "react-router-dom";
import {isLoggedInSelector, tasksSelector, todolistsSelector} from "state/selectors";

export type TodolistType = TodolistDomainType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export const TodoListsList = () => {

    const todolists = useAppSelector(todolistsSelector)
    const tasks = useAppSelector(tasksSelector)
    const isLoggedIn = useAppSelector(isLoggedInSelector)

    const dispatch = useAppDispatch()

    const removeTask = useCallback((taskID: string, todolistId: string) => {
        dispatch(deleteTask({todolistId, taskID}))
    }, [])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(createTask({todolistID, title}))
    }, [])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask({todolistId, taskID, domainModel: {status}}))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({todolistId: todolistId, filter: value})
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolist(id))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskID: string, title: string) => {
        dispatch(updateTask({todolistId, taskID, domainModel: {title}}))
    }, [])

    const changeTodoListTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitle({todolistID, title}))
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItem callback={addTodoList}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: "scroll", height: "85vh"}}>
                {
                    todolists.map(tl => {

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px', width: "280px", position: "relative"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
};