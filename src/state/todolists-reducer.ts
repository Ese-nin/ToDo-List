import {TodolistType} from "../components/TodoListsList";
import {TodolistDomainType} from "../api/todolist-api";
import {AppStatusType} from "./app-reducer";
import {changeTodolist, createTodolist, deleteTodolist, fetchTodolists} from "./todolists-sagas";


export const todolistsReducer = (state: Array<TodolistType> = [], action: TodolistActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET_TODO":
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'TODO/CHANGE_ENTITY_STATUS':
            return state.map(el => el.id === action.todoListId
                ? {...el, entityStatus: action.entityStatus} : el)
        case 'TODO/CLEAR_DATA':
            return []
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
export const ClearDataAC = () => {
    return {type: 'TODO/CLEAR_DATA'} as const
}

// types
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type SetTodoActionType = ReturnType<typeof SetTodoAC>
export type ChangeEntityStatusActionType = ReturnType<typeof ChangeEntityStatusAC>
export type ClearDataActionType = ReturnType<typeof ClearDataAC>

export type TodolistActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoActionType
    | ChangeEntityStatusActionType
    | ClearDataActionType
    | ReturnType<typeof fetchTodolists>
    | ReturnType<typeof createTodolist>
    | ReturnType<typeof deleteTodolist>
    | ReturnType<typeof changeTodolist>

export type FilterValuesType = "all" | "active" | "completed";