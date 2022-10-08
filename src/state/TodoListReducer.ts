import {FilterValuesType, TodoListsType} from "../components/App";

export const TodoListReducer = (state: Array<TodoListsType>, action: ActionTypes): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(el => el.id !== action.payload.todoListID)
        case 'ADD_TODOLIST':
            const newTodoList: TodoListsType = {id: action.payload.newTodoListID, title: action.payload.newTitle, filter: 'all'}
            return [newTodoList, ...state];
        case 'EDIT_TODOLIST_TITLE':
            return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.newTitle} : el)
        case 'FILTERED_TASKS':
            return state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}

type ActionTypes = removeTodoListACType | addTodoListACType | editTodoListTitleACType | filteredTasksACType

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type editTodoListTitleACType = ReturnType<typeof editTodoListTitleAC>
type filteredTasksACType = ReturnType<typeof filteredTasksAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todoListID: todoListID
        }
    } as const
}

export const addTodoListAC = (newTodoListID: string, newTitle: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            newTitle: newTitle,
            newTodoListID: newTodoListID
        }
    } as const
}

export const editTodoListTitleAC = (newTodoListID: string, newTitle: string) => {
    return {
        type: 'EDIT_TODOLIST_TITLE',
        payload: {
            todoListID: newTodoListID,
            newTitle: newTitle
        }
    } as const
}

export const filteredTasksAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'FILTERED_TASKS',
        payload: {
            todoListID: todoListID,
            filter: filter
        }
    } as const
}