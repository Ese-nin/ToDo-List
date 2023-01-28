import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from '../tasks-reducer'
import {addTodolistAC, clearDataAC} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({todolistId: 'todolistId2', taskID: '2'})

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                startDate: '',
                addedDate: '',
                description: '',
                priority: TaskPriorities.Low,
                completed: false,
                order: 0,
                entityStatus: "idle"
            }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const task = {
        id: '2', title: 'juice', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
        addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"
    }

    const action = addTaskAC({task})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})


test('status of specified task should be changed', () => {

    const task = {
        id: '2', title: 'juice', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
        addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"
    }

    const action = updateTaskAC({task})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})


test('task-title should be changed', () => {

    const task = {
        id: '1', title: 'Angular', status: TaskStatuses.New, todoListId: 'todolistId1', deadline: '', startDate: '',
        addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0, entityStatus: "idle"
    }


    const action = updateTaskAC({task})

    const endState = tasksReducer(startState, action)

    expect(startState['todolistId1'][0].title).toBe('CSS');
    expect(endState['todolistId1'][0].title).toBe('Angular')
})


test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({todolist: {id: 'new todolist', title: "What to learn", addedDate: '', order: 0}})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('actual tasks should be added', () => {

    startState = {}
    const todolistID = 'todolistId2'
    const tasks = [
        {
            id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
            addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0
        },
        {
            id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', deadline: '', startDate: '',
            addedDate: '', description: '', priority: TaskPriorities.Low, completed: false, order: 0
        }
    ]

    const action = setTasksAC({todolistID, tasks})

    const endState = tasksReducer(startState, action)


    expect(endState[todolistID][1].id).toBe('3')
    expect(endState[todolistID][0].title).toBe('bread')
})


test('entityStatus of task should be changed', () => {
    const newStatus = 'success'
    const todolistId = 'todolistId2'
    const taskID = '2'

    const endState = tasksReducer(startState, changeTaskEntityStatusAC({todolistId, taskID, status: newStatus}))

    expect(endState[todolistId][1].entityStatus).toBe(newStatus)
})

test('tasks must be reset', () => {

    const endState = tasksReducer(startState, clearDataAC())

    expect(endState).toStrictEqual({})
})