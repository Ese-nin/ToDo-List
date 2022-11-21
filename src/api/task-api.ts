import axios from "axios";

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
        return instance.post<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks`, {title})
            .then(res=>res.data)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res=>res.data)
    },
    changeTask(todolistID: string, taskID: string, domainModel: DomainModelTaskType) {
        return instance.put<TaskResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, domainModel)
            .then(res=>res.data)
    }
}

export type DomainModelTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TaskType = {
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
    items: TaskType[],
    totalCount: number,
    error: string
}
type TaskResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: T
}