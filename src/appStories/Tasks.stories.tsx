import React, {useState} from 'react';
import {taskAPI} from "../api/task-api";
import {UpdateModelTaskType} from "../state/tasks-reducer";

export default {
    title: 'tasks'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')

    const getTodolists = (todolistID: string) => {
        taskAPI.getTasks(todolistID)
            .then(data=>setState(data))
    }

    return (
        <div>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <button onClick={()=>getTodolists(todolistID)}>Get Tasks</button>
            {JSON.stringify(state)}
        </div>
    )
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [title, setTitle] = useState('')

    const createTask = (todolistID: string, title: string) => {
        taskAPI.createTask(todolistID, title)
            .then(data=>setState(data))
    }

    return (
        <div>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}/>
            <button onClick={()=>createTask(todolistID, title)}>Create Task</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [taskID, setTaskID] = useState('')

    const createTask = (todolistID: string, taskID: string) => {
        taskAPI.deleteTask(todolistID, taskID)
            .then(data=>setState(data))
    }

    return (
        <div>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <input value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)} placeholder={'taskID'}/>
            <button onClick={()=>createTask(todolistID, taskID)}>Delete Task</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const ChangeTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [taskID, setTaskID] = useState('')
    const [title, setTitle] = useState('')

    const changeTask = (todolistID: string, taskID: string, title: string) => {

        const model: UpdateModelTaskType = {
            title,
            completed: false,
            deadline: '',
            description: '',
            priority: 0,
            status: 0,
            startDate: '',
        }

        taskAPI.changeTask(todolistID, taskID, model)
            .then(data=>setState(data))
    }

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}/>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <input value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)} placeholder={'taskID'}/>
            <button onClick={()=>changeTask(todolistID, taskID, title)}>Change Task</button>
            {JSON.stringify(state)}
        </div>
    )
}