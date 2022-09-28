import {TasksType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)}
        }
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID ?
                        {...el, isDone: action.payload.isDone} : el)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID ?
                        {...el, title: action.payload.currentTitle} : el)}
        }
        case "ADD-EMPTY-TASKS-ARRAY": {
            return {...state, [action.payload.newTodoListID]: []}
        }
        default:
            return state
    }
}

type ActionType = removeTaskACType |
    addTaskACType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    addEmptyTasksArrayACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addEmptyTasksArrayACType = ReturnType<typeof addEmptyTasksArrayAC>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListID: todoListID,
            taskID: taskID,
        }
    } as const
}

export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListID: todoListID,
            title: title,
        }
    } as const
}

export const changeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todoListID: todoListID,
            taskID: taskID,
            isDone: isDone,
        }
    } as const
}

export const changeTaskTitleAC = (todoListID: string, taskID: string, currentTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoListID: todoListID,
            taskID: taskID,
            currentTitle: currentTitle,
        }
    } as const
}

export const addEmptyTasksArrayAC = (newTodoListID: string) => {
    return {
        type: "ADD-EMPTY-TASKS-ARRAY",
        payload: {
            newTodoListID: newTodoListID,
        }
    } as const
}