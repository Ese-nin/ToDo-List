import axios from "axios";
import {UpdateModelTaskType} from "../state/tasks-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5cd1a899-de0c-4c99-a4b1-a156f06021b6'
    }
})

export const taskAPI = {
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistID}/tasks`)
            .then(res=>res.data)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<TaskResponseType<{item: TaskDomainType}>>(`todo-lists/${todolistID}/tasks`, {title})
            .then(res=>res.data)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res=>res.data)
    },
    changeTask(todolistID: string, taskID: string, domainModel: UpdateModelTaskType) {
        return instance.put<TaskResponseType<{item: TaskDomainType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, domainModel)
            .then(res=>res.data)
    }
}

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
type GetTasksResponseType = {
    items: TaskDomainType[],
    totalCount: number,
    error: string
}
type TaskResponseType<T = {}> = {
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