import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import AddItem from "./AddItem";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, todoDispatch] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })


    function removeTask(id: string, todolistId: string) {
        tasksDispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        tasksDispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        tasksDispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        todoDispatch(ChangeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id)
        todoDispatch(action)
        tasksDispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        todoDispatch(action)
        tasksDispatch(action)
    }

    const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
        tasksDispatch(changeTaskTitleAC(taskID, title, todoListID))
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        todoDispatch(ChangeTodolistTitleAC(todoListID, title))
    }

    return (
        <div className="App">
            <AddItem callback={addTodoList}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
