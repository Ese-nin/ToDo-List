import React from 'react';
import './App.css';
import TodoList, {TaskType} from './components/TodoList/TodoList';

//BLL:
const todoListTitle_1: string = "What to learn";
const todoListTitle_2: string = "What to learn tomorrow";

const tasks_1: Array<TaskType> = [
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: false},
    {id: 3, title: "JS", isDone: true},
    {id: 4, title: "React", isDone: false}
];
const tasks_2: Array<TaskType> = [
    {id: 1, title: "Python", isDone: false},
    {id: 2, title: "Java", isDone: false},
    {id: 3, title: "NodeJS", isDone: false}
];


//UI:
const App = () => {
    return (
        <div className={"App"}>
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
};

export default App;