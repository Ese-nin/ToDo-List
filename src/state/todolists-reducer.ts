import {TodolistType} from "../components/TodoListsList";
import {ResponseCode, todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {AppThunk} from "../store/store";
import {AppStatusType, changeAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {SetTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        setTodoAC(state, action: PayloadAction<{ todolists: TodolistDomainType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistDomainType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        },
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
    }
})


export const todolistsReducer = slice.reducer;
export const {
    setTodoAC,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeEntityStatusAC,
    clearDataAC
} = slice.actions

// thunk
export const SetTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodoAC({todolists: res.data}))
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
            return res.data
        })
        .then((todos) => {
            todos.forEach(todo => {
                dispatch(SetTasksTC(todo.id))
            })
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const CreateTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(changeAppStatusAC({appStatus: 'idle'}))
            } else {
                handleServerAppError<{ item: TodolistDomainType }>(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const DeleteTodolistsTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    dispatch(changeEntityStatusAC({todolistId: todolistID, entityStatus: 'loading'}))
    todolistAPI.deleteTodolist(todolistID)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(removeTodolistAC({todolistId: todolistID}))
                dispatch(changeAppStatusAC({appStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(changeEntityStatusAC({todolistId: todolistID, entityStatus: 'idle'}))
        })
}
export const ChangeTodolistsTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    todolistAPI.changeTodolist(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(changeTodolistTitleAC({todolistId: todolistID, title}))
                dispatch(changeAppStatusAC({appStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}


// types

export type FilterValuesType = "all" | "active" | "completed";