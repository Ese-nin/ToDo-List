import React, {useState} from 'react';
import TodoList from "./Components/TodoList";
import {RootStateType, taskType} from "./Redux/State";
import {v1} from "uuid";
import "./App.css";

type AppPropsType = {
    state: RootStateType
}
export type FilterValuesType = "all" | "active" | "completed"

const App = (props: AppPropsType) => {
    const [tasks, setTasks] = useState<Array<taskType>>(props.state.tasks);
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (id: string) => {
        const resultTasks = tasks.filter(t => t.id !== id)
        setTasks(resultTasks)
    }

    const addTask = (value: string) => {
        const newTask = {id: v1(), title: value, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id !== id ? t : {...t, isDone}))
    } // если своство объекта и имя аргумента совпадают,
    // можно сократить (isDone: isDone -> isDone)

    const tasksForTodoList = (value: FilterValuesType) => {
        setFilter(value)
    }

    let filteredTasks = tasks;
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return (
        <TodoList title={props.state.title}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  tasksForTodoList={tasksForTodoList}
                  addTask={addTask}
                  changeStatus={changeStatus}
                  filter={filter}/>
    );
};

export default App;