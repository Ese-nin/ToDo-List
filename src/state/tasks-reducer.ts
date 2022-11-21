import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../components/TodoListsList";


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID
                    ? {...el, isDone: action.isDone} : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskID
                    ? {...el, title: action.payload.title} : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskID} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskID, isDone} as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskID,
            title,
            todolistId
        }
    } as const
}