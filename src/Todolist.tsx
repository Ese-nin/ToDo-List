import React from 'react';
import {FilterValuesType} from './App';
import AddItem from "./AddItem";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const changeTaskTitle = (taskID: string, title: string) => {
        props.changeTaskTitle(props.id, taskID, title)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={(title) => changeTodoTitle(title)}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItem callback={addTask}/>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <Task
                        key={t.id}
                        todoListID={props.id}
                        taskID={t.id}
                        isDone={t.isDone}
                        title={t.title}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}/>
                })
            }
        </ul>

    </div>
}