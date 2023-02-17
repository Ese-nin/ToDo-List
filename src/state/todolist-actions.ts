import {createAsyncThunk} from "@reduxjs/toolkit";
import {changeAppStatusAC} from "./app-reducer";
import {ResponseCode, todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {fetchTasks} from "./tasks-actions";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {changeEntityStatusAC} from "./todolists-reducer";

export const fetchTodolists = createAsyncThunk('todolists/fetchTodo', async (param, {dispatch, rejectWithValue}) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(changeAppStatusAC({appStatus: 'idle'}))

        res.data.forEach(todo => {
            dispatch(fetchTasks(todo.id))
        })
        return {todolists: res.data}
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const createTodolist = createAsyncThunk('todolists/createTodo', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError<{ item: TodolistDomainType }>(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const deleteTodolist = createAsyncThunk('todolists/deleteTodo', async (todolistID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    dispatch(changeEntityStatusAC({todolistId: todolistID, entityStatus: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistID)

        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return {todolistId: todolistID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(changeEntityStatusAC({todolistId: todolistID, entityStatus: 'idle'}))
    }
})
export const changeTodolistTitle = createAsyncThunk('todolists/changeTodo', async (param: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {todolistID, title} = param
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    try {
        const res = await todolistAPI.changeTodolist(todolistID, title)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return {todolistId: todolistID, title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})