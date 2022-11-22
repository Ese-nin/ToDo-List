import {AddTodolistActionType, RemoveTodolistActionType, SetTodoActionType} from "./todolists-reducer";
import {taskAPI, TaskType} from "../api/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType): TasksStateType => {
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
                [action.todolistID]: action.tasks
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'CHANGE_TASK':
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
        default:
            return state
    }
}

// actions
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistID, tasks} as const
}
export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (task: TaskType) => {
    return {type: 'CHANGE_TASK', task} as const
}


// thunk
export const SetTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistID)
        .then((data) => {
            dispatch(setTasksAC(todolistID, data.items))
        })
}
export const CreateTasksTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistID, title)
        .then((data) => {
            dispatch(addTaskAC(data.data.item))
        })
}
export const DeleteTasksTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}
export const UpdateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateModelTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistID].find(t => t.id === taskID)

        if (task) {
            const model: UpdateModelTaskType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }

            taskAPI.changeTask(todolistID, taskID, model)
                .then((data) => {
                    dispatch(updateTaskAC(data.data.item))
                })
        }
    }


// types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTasksACType = ReturnType<typeof updateTaskAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoActionType
    | SetTasksACType
    | UpdateTasksACType

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type UpdateModelTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}