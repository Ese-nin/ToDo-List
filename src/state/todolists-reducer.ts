import {TodolistType} from "../components/TodoListsList";
import {todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {Dispatch} from 'redux'


export const todolistsReducer = (state: Array<TodolistType> = [], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "SET_TODO":
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
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

// thunk
export const SetTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((data) => {
            dispatch(SetTodoAC(data))
        })
}
export const CreateTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((data) => {
            dispatch(AddTodolistAC(data.data.item))
        })
}
export const DeleteTodolistsTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(() => {
            dispatch(RemoveTodolistAC(todolistID))
        })
}
export const ChangeTodolistsTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.changeTodolist(todolistID, title)
        .then(() => {
            dispatch(ChangeTodolistTitleAC(todolistID, title))
        })
}


// types
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type SetTodoActionType = ReturnType<typeof SetTodoAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoActionType

export type FilterValuesType = "all" | "active" | "completed";