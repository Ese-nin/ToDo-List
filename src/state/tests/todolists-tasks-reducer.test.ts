import {tasksReducer, TasksStateType} from "../tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC, todolistsReducer} from "../todolists-reducer";
import {TodolistType} from "../../components/TodoListsList";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC({id: 'todolistID5', addedDate: '', order: 0, title: 'new todolist'})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
                addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"}
        ]
    }

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})