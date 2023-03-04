import axios, {AxiosResponse} from "axios";
import {UpdateModelTaskType} from "../state/tasks-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5cd1a899-de0c-4c99-a4b1-a156f06021b6'
    }
})


export const todolistAPI = {
    getTodolists(): Promise<AxiosResponse<TodolistDomainType[]>> {
        return instance.get<TodolistDomainType[]>('todo-lists')
    },
    createTodolist(title: string): Promise<AxiosResponse<ResponseType<{ item: TodolistDomainType }>>> {
        return instance.post<ResponseType<{ item: TodolistDomainType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistID: string): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    changeTodolist(todolistID: string, title: string): Promise<AxiosResponse<ResponseType>> {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
    }
}

export const taskAPI = {
    getTasks(todolistID: string): Promise<AxiosResponse<GetTasksResponseType>> {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title: string): Promise<AxiosResponse<TaskResponseType<{ item: TaskDomainType }>>> {
        return instance.post<TaskResponseType<{ item: TaskDomainType }>>(`todo-lists/${todolistID}/tasks`, {title})
    },
    deleteTask(todolistID: string, taskID: string): Promise<AxiosResponse<TaskResponseType>> {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    changeTask(todolistID: string, taskID: string, domainModel: UpdateModelTaskType): Promise<AxiosResponse<TaskResponseType<{ item: TaskDomainType }>>> {
        return instance.put<TaskResponseType<{ item: TaskDomainType }>>(`todo-lists/${todolistID}/tasks/${taskID}`, domainModel)
    }
}

export const authAPI = {
    me(): Promise<AxiosResponse<ResponseType<IsAutorizedResponseType>>> {
        return instance.get<ResponseType<IsAutorizedResponseType>>('auth/me')
    },
    login(data: DomainLoginModelType): Promise<AxiosResponse<ResponseType<{ userId: number }>>> {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    logout(): Promise<AxiosResponse<ResponseType>> {
        return instance.delete<ResponseType>('auth/login')
    }
}


// types

export type TaskDomainType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksResponseType = {
    items: TaskDomainType[],
    totalCount: number,
    error: string
}
export type TaskResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodolistDomainType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: T
}

export enum ResponseCode {
    SUCCESS = 0,
    REQUEST_IS_INVALID = 1,
    CAPTCHA = 10,
}

export type DomainLoginModelType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export type IsAutorizedResponseType = {
    id: number
    email: string
    login: string
}