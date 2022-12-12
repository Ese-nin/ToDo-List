import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import AddItem from "./AddItem";
import {useAppDispatch, useAppSelector} from "../store/store";
import {CreateTasksTC, DeleteTasksTC, TasksStateType, UpdateTaskTC} from "../state/tasks-reducer";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistsTC,
    CreateTodolistsTC,
    DeleteTodolistsTC,
    FilterValuesType,
    SetTodolistsTC
} from "../state/todolists-reducer";
import {TaskStatuses, TodolistDomainType} from "../api/todolist-api";
import {AppStatusType} from "../state/app-reducer";
import {Navigate} from "react-router-dom";

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
        dispatch(DeleteTasksTC(todolistId, id))
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(CreateTasksTC(todolistId, title))
    }, [])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(UpdateTaskTC(todoListID, taskID, {status}))
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(DeleteTodolistsTC(id))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(CreateTodolistsTC(title))
    }, [])

    const changeTaskTitle = useCallback((todoListID: string, taskID: string, title: string) => {
        dispatch(UpdateTaskTC(todoListID, taskID, {title}))
    }, [])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(ChangeTodolistsTC(todoListID, title))
    }, [])

    useEffect(()=>{
        if (!isLoggedIn) {
            return
        }
        dispatch(SetTodolistsTC())
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