import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./reducers/todoListsReducer";
import {
    addEmptyTasksArrayAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer(todoListsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })


    function removeTask(todoListID: string, taskID: string) {
        tasksDispatch(removeTaskAC(todoListID, taskID))
    }

    function addTask(todoListID: string, title: string) {
        tasksDispatch(addTaskAC(todoListID, title))
    }

    function changeStatus(todoListID: string, taskID: string, isDone: boolean) {
        tasksDispatch(changeTaskStatusAC(todoListID, taskID, isDone))
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        todolistsDispatch(changeFilterAC(todoListID, value))
    }

    const removeTodoList = (todoListID: string) => {
        todolistsDispatch(removeTodoListAC(todoListID))
    }

    const addTodoList = (title: string) => {
        const newTodoListID = v1();
        todolistsDispatch(addTodoListAC(newTodoListID, title))
        tasksDispatch(addEmptyTasksArrayAC(newTodoListID))
    }

    const changeTaskTitle = (todoListID: string, taskID: string, currentTitle: string) => {
        tasksDispatch(changeTaskTitleAC(todoListID, taskID, currentTitle))
    }

    const changeTodoListTitle = (todoListID: string, currentTitle: string) => {
        todolistsDispatch(changeTodoListTitleAC(todoListID, currentTitle))
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodoList}/>
            {todolists.map(el => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <TodoList
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
