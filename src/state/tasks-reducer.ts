import {clearDataAC, createTodolist, deleteTodolist, fetchTodolists} from "./todolists-reducer";
import {AppStatusType, changeAppStatusAC} from "./app-reducer";
import {ResponseCode, taskAPI, TaskDomainType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";
import {AxiosError} from "axios";


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


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskID: string, status: AppStatusType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index !== -1) {
                tasks[index].entityStatus = action.payload.status
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(clearDataAC, () => {
            return {}
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks.map((el) => ({...el, entityStatus: 'idle'}))
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'})
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.task.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.task.id);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.task}
            }
        })
    }
})

export const tasksReducer = slice.reducer;
export const {changeTaskEntityStatusAC} = slice.actions


// types

export type TasksStateType = {
    [key: string]: TaskType[]
}

type TaskType = TaskDomainType & { entityStatus: AppStatusType }

export type UpdateModelTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}