import React, {useState} from 'react';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'todolists'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    const getTodolists = () => {
        todolistAPI.getTodolists()
            .then(data=>setState(data))
    }

    return (
        <div>
            <button onClick={getTodolists}>Get Todolists</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')

    const createTodolists = (title: string) => {
        todolistAPI.createTodolist(title)
            .then(data=>setState(data))
    }
    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}/>
            <button onClick={() => createTodolists(title)}>Create Todolists</button>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')

    const deleteTodolists = (todolistID: string) => {
        todolistAPI.deleteTodolist(todolistID)
            .then(data=>setState(data))
    }
    return (
        <div>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <button onClick={() => deleteTodolists(todolistID)}>Delete Todolists</button>
            {JSON.stringify(state)}
        </div>
    )
}


export const ChangeTodolists = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [title, setTitle] = useState('')

    const changeTodolists = (todolistID: string, title: string) => {
        todolistAPI.changeTodolist(todolistID, title)
            .then(data=>setState(data))
        }

    return (
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={'title'}/>
            <input value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}
                   placeholder={'todolistID'}/>
            <button onClick={()=>changeTodolists(todolistID, title)}>Change Todolists</button>
            {JSON.stringify(state)}
        </div>
    )
}