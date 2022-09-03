import React, {useState} from 'react';
import TodoList from "./Components/TodoList";
import {RootStateType, taskType} from "./Redux/State";
import {v1} from "uuid";

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
                  addTask={addTask}/>
    );
};

export default App;