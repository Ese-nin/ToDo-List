import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, TasksReducer} from "./TasksReducer";
import {TasksType} from "../components/App";


test('task should be removed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: TasksType = {
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
    }

    const newTasks = TasksReducer(state, removeTaskAC(todoListID1, state[todoListID1][0].id))

    expect(newTasks[todoListID1].length).toBe(4)
    expect(newTasks[todoListID2].length).toBe(5)
    expect(newTasks[todoListID1][0].title).toBe('JS and TS')
})


test('task status should be changed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: TasksType = {
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
    }

    const newTasks = TasksReducer(state, changeTaskStatusAC(todoListID1, state[todoListID1][0].id,false))

    expect(newTasks[todoListID1][0].isDone).toBe(false);
})



test('task should be added', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: TasksType = {
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
    }

    const newTitle = 'qwerty'

    const newTasks = TasksReducer(state, addTaskAC(todoListID1, newTitle))

    expect(newTasks[todoListID1].length).toBe(6);
    expect(newTasks[todoListID1][0].title).toBe(newTitle);
})


test('task title should be changed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: TasksType = {
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
    }

    const newTitle = 'qwerty'

    const newTasks = TasksReducer(state, editTaskTitleAC(todoListID1, state[todoListID1][0].id, newTitle))

    expect(newTasks[todoListID1][0].title).toBe(newTitle);
})