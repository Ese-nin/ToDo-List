import React, {useState} from 'react';
import TodoList, {TasksProps} from "./components/TodoList/TodoList";
import "./App.css"

export type FilterValueType = "All" | "Active" | "Completed"

const App = () => {
    const [tasks, setTasks] = useState<Array<TasksProps>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>("All")

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let filteredTasks = tasks;
    if (filter === "Active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    } if (filter === "Completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    const removeTasks = (id: number) => {
        let currentTasks = tasks.filter(t => t.id !== id)
        setTasks(currentTasks)
    }

    return (
        <div>
            <TodoList title="What to learn"
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}/>
        </div>
    );
};

export default App;