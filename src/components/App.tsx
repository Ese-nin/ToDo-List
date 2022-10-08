import React, {useReducer} from 'react';
import {v1} from "uuid";
import TodoList from "./Todolist";
import "../App.css"
import {AddItem} from "./AddItemComponent";
import {
    addTodoListAC,
    editTodoListTitleAC,
    filteredTasksAC,
    removeTodoListAC,
    TodoListReducer
} from "../state/TodoListReducer";
import {
    addEmptyTasksArrayAC,
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,
    TasksReducer
} from "../state/TasksReducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {

    let todoListID1 = v1();
    let todoListID2 = v1();

    const [todoLists, todoListsDispatch] = useReducer(TodoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, tasksDispatch] = useReducer(TasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS and TS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS and TS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    const removeTask = (todoListID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todoListID, taskID))
    }

    const filteredTasks = (todoListID: string, filter: FilterValuesType) => {
        todoListsDispatch(filteredTasksAC(todoListID, filter))
    }

    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todoListID, taskID, isDone))
    }

    const addTask = (todoListID: string, newTaskTitle: string) => {
        tasksDispatch(addTaskAC(todoListID, newTaskTitle))
    }

    const removeTodoList = (todoListID: string) => {
        todoListsDispatch(removeTodoListAC(todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        todoListsDispatch(addTodoListAC(newTodoListID, title))
        tasksDispatch(addEmptyTasksArrayAC(newTodoListID))
    }

    const editTaskTitle = (todoListID: string, taskID: string, currentTitle: string) => {
        tasksDispatch(editTaskTitleAC(todoListID, taskID, currentTitle))
    }

    const editTodoListTitle = (todoListID: string, currentTitle: string) => {
        todoListsDispatch(editTodoListTitleAC(todoListID, currentTitle))
    }

    return (
        <div className='App'>
            <AddItem callback={addTodoList}/>
            {todoLists.map(el => {

                    let currentTasks = tasks[el.id]
                    if (el.filter === 'active') {
                        currentTasks = tasks[el.id].filter(t => !t.isDone)
                    }
                    if (el.filter === 'completed') {
                        currentTasks = tasks[el.id].filter(t => t.isDone)
                    }

                    return <TodoList
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={currentTasks}
                        removeTask={removeTask}
                        filteredTasks={filteredTasks}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        filter={el.filter}
                        addTask={addTask}
                        editTaskTitle={editTaskTitle}
                        editTodoListTitle={editTodoListTitle}/>
                }
            )}
        </div>
    );
};

