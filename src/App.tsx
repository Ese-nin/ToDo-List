import React, {useState} from 'react';
import {v1} from "uuid";
import {TodoList} from "./Todolist";
import './App.css'
import {AddItem} from "./components/AddItem";


export type FilterValuesType = 'all' | 'active' | 'completed'

type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const addTask = (todoListID: string, value: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const filterTasks = (todoListID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListID))
    }

    const addItemHandler = (title: string) => {
        const newTodolistID = v1();
        const newTodoList: todoListsType = {id: newTodolistID, title: title, filter: 'all'}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    const editTaskTitle = (todoListID: string, taskID: string, currentTitle: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: currentTitle} : t)
        })
    }

    const editTodoListTitle = (todoListID: string, currentTitle: string) => {
        setTodolists(todolists.map(el=> el.id===todoListID ? {...el, title: currentTitle} : el))
    }

    return (
        <div className='App'>
            <AddItem addItem={addItemHandler}/>
            {todolists.map(el => {

                let tasksForTodoList = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                }

                return <TodoList
                    key={el.id}
                    todoListID={el.id}
                    title={el.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    filterTasks={filterTasks}
                    filter={el.filter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    editTaskTitle={editTaskTitle}
                    editTodoListTitle={editTodoListTitle}/>
            })}
        </div>
    )

}