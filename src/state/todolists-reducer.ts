import {TodolistType} from "../components/TodoListsList";
import {ResponseCode, todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {AppThunk} from "../store/store";
import {AppStatusType, changeAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export const todolistsReducer = (state: Array<TodolistType> = [], action: TodolistActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET_TODO":
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case 'TODO/CHANGE_ENTITY_STATUS':
            return state.map(el => el.id === action.todoListId
                ? {...el, entityStatus: action.entityStatus} : el)
        default:
            return state
    }
}

// actions
export const SetTodoAC = (todolists: TodolistDomainType[]) => {
    return {type: 'SET_TODO', todolists} as const
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (todolist: TodolistDomainType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId} as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId} as const
}
export const ChangeEntityStatusAC = (todoListId: string, entityStatus: AppStatusType) => {
    return {type: 'TODO/CHANGE_ENTITY_STATUS', todoListId, entityStatus} as const
}

// thunk
export const SetTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((data) => {
            dispatch(SetTodoAC(data))
            dispatch(changeAppStatusAC('idle'))
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const CreateTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((data) => {
            if (data.resultCode === ResponseCode.SUCCESS) {
                dispatch(AddTodolistAC(data.data.item))
                dispatch(changeAppStatusAC('idle'))
            } else {
                handleServerAppError<{ item: TodolistDomainType }>(data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const DeleteTodolistsTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(ChangeEntityStatusAC(todolistID, 'loading'))
    todolistAPI.deleteTodolist(todolistID)
        .then((data) => {
            if (data.resultCode === ResponseCode.SUCCESS) {
                dispatch(RemoveTodolistAC(todolistID))
                dispatch(changeAppStatusAC('idle'))
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(ChangeEntityStatusAC(todolistID, 'idle'))
        })
}
export const ChangeTodolistsTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    todolistAPI.changeTodolist(todolistID, title)
        .then((data) => {
            if (data.resultCode === ResponseCode.SUCCESS) {
                dispatch(ChangeTodolistTitleAC(todolistID, title))
                dispatch(changeAppStatusAC('idle'))
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}


// types
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type SetTodoActionType = ReturnType<typeof SetTodoAC>
export type ChangeEntityStatusActionType = ReturnType<typeof ChangeEntityStatusAC>

export type TodolistActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoActionType
    | ChangeEntityStatusActionType

export type FilterValuesType = "all" | "active" | "completed";