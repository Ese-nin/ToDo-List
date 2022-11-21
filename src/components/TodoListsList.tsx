import React from 'react';
import {Grid, Paper} from "@mui/material";
import {TaskType, Todolist} from "./Todolist";
import AddItem from "./AddItem";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const TodoListsList = () => {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        const action = ChangeTodolistTitleAC(todoListID, title)
        dispatch(action)
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItem callback={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
};