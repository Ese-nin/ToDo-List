import React, {useState} from 'react';
import TodoList from "./Components/TodoList";
import {RootStateType, taskType} from "./Redux/State";
import {v1} from "uuid";
import "./App.css"

export type FilterValuesType = "all" | "active" | "completed"

type AppPropsType = {
    state: RootStateType
}

const App = (props: AppPropsType) => {

    const [tasks, setTasks] = useState<Array<taskType>>(props.state.tasks)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (value: string) => {
        let newTask = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        const selectedTasks = tasks.filter(t => t.id !== taskID)
        setTasks(selectedTasks)
    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    const tasksForTodoList = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id !== taskID ? t : {...t, isDone: isDone}))
    }

    return (
        <TodoList tasks={filteredTasks}
                  title={props.state.title}
                  addTask={addTask}
                  removeTask={removeTask}
                  tasksForTodoList={tasksForTodoList}
                  changeStatus={changeStatus}
                  filter={filter}/>
    );
};

export default App;