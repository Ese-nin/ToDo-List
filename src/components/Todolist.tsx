import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItem} from "./AddItemComponent";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    filter: FilterValuesType
    todoListID: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    filteredTasks: (todoListID: string, filter: FilterValuesType) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    addTask: (todoListID: string, newTaskTitle: string) => void
    removeTodoList: (todoListID: string) => void
    editTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    editTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksList = props.tasks.length ?
        props.tasks.map(el => {

            const deleteTask = () => {
                props.removeTask(props.todoListID, el.id)
            }

            const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoListID, el.id, e.currentTarget.checked)
            }

            const editTaskTitleHandler = (currentTitle: string) => {
                props.editTaskTitle(props.todoListID, el.id, currentTitle)
            }

            return (
                <li key={el.id}>
                    <input
                        onChange={changeCheckboxHandler}
                        type="checkbox"
                        checked={el.isDone}/>
                    <EditableSpan callback={editTaskTitleHandler} title={el.title}/>
                    <button onClick={deleteTask}>del</button>
                </li>
            )
        }) : <span>List empty</span>

    const filterButtonHandlerAll = () => {
        props.filteredTasks(props.todoListID, 'all')
    }
    const filterButtonHandlerActive = () => {
        props.filteredTasks(props.todoListID, 'active')
    }
    const filterButtonHandlerCompleted = () => {
        props.filteredTasks(props.todoListID, 'completed')
    }

    const deleteTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    const editTodoListTitleHandler = (currentTitle: string) => {
        props.editTodoListTitle(props.todoListID, currentTitle)
    }

    return (
        <div>
            <h4>
                <EditableSpan title={props.title} callback={editTodoListTitleHandler}/>
                <button onClick={deleteTodoListHandler}>x</button>
            </h4>
            <AddItem callback={addTaskHandler}/>
            <div style={{marginLeft: "15px"}}>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={filterButtonHandlerAll}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={filterButtonHandlerActive}>
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={filterButtonHandlerCompleted}>
                    Completed
                </button>
            </div>
            <ul>
                {tasksList}
            </ul>
        </div>
    );
};

export default TodoList;