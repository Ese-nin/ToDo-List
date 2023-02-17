import {createAsyncThunk} from "@reduxjs/toolkit";
import {changeAppStatusAC} from "./app-reducer";
import {ResponseCode, taskAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {AppRootStateType} from "../store/store";
import {changeTaskEntityStatusAC, UpdateModelTaskType} from "./tasks-reducer";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    try {
        const res = await taskAPI.getTasks(todolistID)
        dispatch(changeAppStatusAC({appStatus: 'idle'}))
        return {todolistID, tasks: res.data.items}
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const createTask = createAsyncThunk('tasks/createTask', async (param: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    try {
        const res = await taskAPI.createTask(param.todolistID, param.title)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return res.data.data.item
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
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (param: { todolistId: string, taskID: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {todolistId, taskID} = param
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'loading'}))
    try {
        const res = await taskAPI.deleteTask(todolistId, taskID)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return {todolistId, taskID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'idle'}))
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskID: string, domainModel: UpdateModelTaskType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const {todolistId, taskID, domainModel} = param
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'loading'}))
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistId].find(t => t.id === taskID)

    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const model: UpdateModelTaskType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel
    }
    try {
        const res = await taskAPI.changeTask(todolistId, taskID, model)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'idle'}))
    }
})