import {
    AddTodolistActionType,
    ClearDataActionType,
    RemoveTodolistActionType,
    SetTodoActionType
} from "./todolists-reducer";
import {AppStatusType} from "./app-reducer";
import {TaskDomainType} from "../api/todolist-api";
import {createTask, deleteTask, fetchTasks, updateTask} from "./tasks-sagas";

export const tasksReducer = (state: TasksStateType = {}, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "SET_TODO": {
            let copyState = {...state};
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistID]: action.tasks.map(el => ({...el, entityStatus: 'idle'}))
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id
                    ? {...t, ...action.task} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case "TASK/CHANGE_ENTITY_STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID
                    ? {...el, entityStatus: action.status} : el)
            }
        case 'TODO/CLEAR_DATA':
            return {}
        default:
            return state
    }
}

// actions
export const setTasksAC = (todolistID: string, tasks: TaskDomainType[]) => {
    return {type: 'SET-TASKS', todolistID, tasks} as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}
export const addTaskAC = (task: TaskDomainType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (task: TaskDomainType) => {
    return {type: 'UPDATE_TASK', task} as const
}
export const changeTaskEntityStatusAC = (todolistID: string, taskID: string, status: AppStatusType) => {
    return {type: 'TASK/CHANGE_ENTITY_STATUS', todolistID, taskID, status} as const
}

// types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTasksACType = ReturnType<typeof updateTaskAC>
export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatusAC>

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoActionType
    | SetTasksACType
    | UpdateTasksACType
    | ChangeTaskEntityStatusActionType
    | ClearDataActionType
    | ReturnType<typeof fetchTasks>
    | ReturnType<typeof createTask>
    | ReturnType<typeof deleteTask>
    | ReturnType<typeof updateTask>

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