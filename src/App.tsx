import React, {useState} from 'react';
import TodoList, {TaskType} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TasksValueType = "all" | "active" | "completed"


const title = "What to learn"

const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "NodeJS", isDone: false}
    ])

    const [filter, setFilter] = useState<TasksValueType>("all")

    const filteredTasks = (value: TasksValueType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (id: string) => {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTasks(resultTasks);
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <TodoList title={title}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
                      addTask={addTask}/>
        </div>
    );
};

export default App;