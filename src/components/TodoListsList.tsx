import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import AddItem from "./AddItem";
import {useAppDispatch, useAppSelector} from "../store/store";
import {TasksStateType} from "../state/tasks-reducer";
import {
    ChangeTodolistFilterAC,
    FilterValuesType,
} from "../state/todolists-reducer";
import {TaskStatuses, TodolistDomainType} from "../api/todolist-api";
import {AppStatusType} from "../state/app-reducer";
import {Navigate} from "react-router-dom";
import {createTask, deleteTask, updateTask} from "../state/tasks-sagas";
import {changeTodolist, createTodolist, deleteTodolist, fetchTodolists} from "../state/todolists-sagas";

export type TodolistType = TodolistDomainType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export const TodoListsList = () => {

    const todolists = useAppSelector<TodolistType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTask(todolistId, id))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTask(todolistId, title))
    }, [])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTask(todoListID, taskID, {status}))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(deleteTodolist(id))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [])

    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(updateTask(todoListID, taskID, {title}))
    }, [])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodolist(todoListID, title))
    }, [])

    useEffect(()=>{
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
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
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