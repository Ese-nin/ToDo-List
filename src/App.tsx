import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    //BLL:
    const todoListTitle_1: string = "What to learn today"
    const todoListTitle_2: string = "What to learn next week"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "react", isDone: false},
    ];
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Python", isDone: false},
        {id: 2, title: "MobX", isDone: true},
        {id: 3, title: "Angular", isDone: false},
    ];


    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
