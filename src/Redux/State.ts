import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = Array<TaskType>

export type RootStateType = {
    tasks: TasksType
}

const state = {
    tasks: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "NodeJS", isDone: false}
    ]
}

export default state;