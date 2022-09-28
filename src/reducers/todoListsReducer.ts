import {FilterValuesType, todoListsType} from "../App";

export const todoListsReducer = (state: Array<todoListsType>, action: ActionType): Array<todoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todoListID)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todoListID ?
                {...el, filter: action.payload.value} : el)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todoListID ?
                {...el, title: action.payload.title} : el)
        }
        case "ADD-TODOLIST": {
            const newTodoList: todoListsType = {id: action.payload.newTodoListID, title: action.payload.title, filter: "all"};
            return [newTodoList, ...state]
        }
        default:
            return state
    }
}

type ActionType = removeTodoListACType |
    changeFilterACType |
    changeTodoListTitleACType |
    addTodoListACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListID: todoListID
        }
    } as const
}

export const changeFilterAC = (todoListID: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todoListID: todoListID,
            value: value,
        }
    } as const
}

export const changeTodoListTitleAC = (todoListID: string, currentTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todoListID: todoListID,
            title: currentTitle,
        }
    } as const
}

export const addTodoListAC = (newTodoListID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title: title,
            newTodoListID: newTodoListID,
        }
    } as const
}

