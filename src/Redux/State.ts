import {v1} from "uuid";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type RootStateType = {
    tasks: Array<taskType>
    title: string
}

export const state = {
    tasks: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "NodeJS", isDone: false},
        {id: v1(), title: "Angular", isDone: true}
    ],
    title: "Вот ту лёрн тудой"
}