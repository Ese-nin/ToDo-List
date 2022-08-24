import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";

export type FilterValueType = "All" | "Active" | "Completed"

const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>("All")

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }


    let selectedTasks = tasks;
    if (filter === "Active") {
        selectedTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "Completed") {
        selectedTasks = tasks.filter(t => t.isDone === true)
    }

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <TodoList title={"What to learn"}
                  tasks={selectedTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}/>
    );
};

export default App;