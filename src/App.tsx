import React, {useState} from 'react';
import {v1} from "uuid";
import Todolist from "./Todolist";
import "./App.css"

export type FilterValuesType = "all" | "active" | "completed"

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'Вот ту лёрн тудой', filter: 'all'},
        {id: todolistID2, title: 'Вот ту лёрн туморов', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false}
        ]
    });

    const filterTasks = (todolistID: string, newFilter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ?
            {...el, filter: newFilter} : el))
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)
        })
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todolists.map(tdl => {

                let tasksForTodolist = tasks[tdl.id];
                if (tdl.filter === "active") {
                    tasksForTodolist = tasks[tdl.id].filter(el => !el.isDone)
                }
                if (tdl.filter === "completed") {
                    tasksForTodolist = tasks[tdl.id].filter(el => el.isDone)
                }

                return (
                    <Todolist
                        key={tdl.id}
                        todolistID={tdl.id}
                        filter={tdl.filter}
                        tasks={tasksForTodolist}
                        title={tdl.title}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}/>
                )
            })}
        </div>
    );
};

export default App;