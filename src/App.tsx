import React, {useState} from 'react';
import TodoList, {TaskType} from "./components/TodoList/TodoList";

export type TasksValueType = "all" | "active" | "completed"


const title = "What to learn"

const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<TasksValueType>("all")

    const filteredTasks = (value: TasksValueType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTasks(resultTasks)
    }

    return (
        <div>
            <TodoList title={title}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}/>
        </div>
    );
};

export default App;