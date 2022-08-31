import React, {useState} from 'react';
import {RootStateType, TasksType} from "./Redux/State";
import TodoList from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type AppPropsType = {
    state: RootStateType
}

const App = (props: AppPropsType) => {

    const [tasks, setTasks] = useState<TasksType>(props.state.tasks);
    const [filter, setFilter] = useState("all")

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    const tasksForTodoList = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    let selectedTasks = tasks;
    if (filter === "active") {
        selectedTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        selectedTasks = tasks.filter(t => t.isDone)
    }

    return (
        <TodoList title="Вот ту лёрн тудой"
                  tasks={selectedTasks}
                  removeTask={removeTask}
                  tasksForTodoList={tasksForTodoList}
                  addTask={addTask}/>
    );
};

export default App;