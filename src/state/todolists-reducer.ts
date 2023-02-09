import {TodolistType} from "../components/TodoListsList";
import {ResponseCode, todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {AppStatusType, changeAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "./tasks-reducer";
import {AxiosError} from "axios";


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
        }
        catch(err) {
            const error = err as AxiosError;
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
})


const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: AppStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearDataAC() {
            return []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
    }
})


export const todolistsReducer = slice.reducer;
export const {
    changeTodolistFilterAC,
    changeEntityStatusAC,
    clearDataAC
} = slice.actions


// types

export type FilterValuesType = "all" | "active" | "completed";