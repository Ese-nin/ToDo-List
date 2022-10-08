import {TasksType, TaskType} from "../components/App";
import {v1} from "uuid";


export const TasksReducer = (state: TasksType, action: ActionTypes): TasksType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID ? {
                        ...el, isDone: action.payload.isDone
                    } : el)
            }
        case 'ADD_TASK':
            const newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state, [action.payload.todoListID]:
                    [newTask, ...state[action.payload.todoListID]]
            }
        case 'EDIT_TASK_TITLE':
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID ? {
                        ...el,
                        title: action.payload.newTitle
                    } : el)
            }
        case 'ADD_EMPTY_TASKS_ARRAY':
            return {...state, [action.payload.newTodoListID]: []}
        default:
            return state
    }
}

type ActionTypes = removeTaskACType | changeTaskStatusACType | addTaskACType | editTaskTitleACType | addEmptyTasksArrayACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type editTaskTitleACType = ReturnType<typeof editTaskTitleAC>
type addEmptyTasksArrayACType = ReturnType<typeof addEmptyTasksArrayAC>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoListID: todoListID,
            taskID: taskID,
        }
    } as const
}

export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todoListID,
            taskID,
            isDone,
        }
    } as const
}

export const addTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoListID: todoListID,
            newTitle: newTitle,
        }
    } as const
}

export const editTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {
        type: 'EDIT_TASK_TITLE',
        payload: {
            todoListID,
            taskID,
            newTitle,
        }
    } as const
}

export const addEmptyTasksArrayAC = (newTodoListID: string) => {
    return {
        type: 'ADD_EMPTY_TASKS_ARRAY',
        payload: {
            newTodoListID
        }
    } as const
}

