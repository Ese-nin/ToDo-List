import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./components/TodoList/TodoList";

export type FilterValuesType = "All" | "Active" | "Completed"

//BLL:
const todoListTitle = "What to learn"


//GUI:
const App = () => {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("All")

    const removeTask = (id: number) => {
        let currentTasks = tasks.filter(t => t.id !== id)
        setTasks(currentTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "Active") {
        tasksForTodoList = tasks.filter((t) => t.isDone === false)
    }
    if (filter === "Completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone === true)
    }


    return (
        <div>
            <TodoList title={todoListTitle}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
};

export default App;