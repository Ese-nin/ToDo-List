import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5cd1a899-de0c-4c99-a4b1-a156f06021b6'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistDomainType[]>('todo-lists')
            .then(res=>res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistDomainType}>>(`todo-lists`, {title})
            .then(res=>res.data)
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
            .then(res=>res.data)
    },
    changeTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
            .then(res=>res.data)
    }
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
    CAPTCHA = 10,
}