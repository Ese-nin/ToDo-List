import {v1} from "uuid";
import {
    addTodoListAC,
    editTodoListTitleAC,
    filteredTasksAC,
    removeTodoListAC,
    TodoListReducer
} from "./TodoListReducer";
import {TodoListsType} from "../components/App";


test('todolist should be removed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: Array<TodoListsType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ]

    const newTodoLists = TodoListReducer(state, removeTodoListAC(todoListID1))

    expect(newTodoLists.length).toBe(1);
    expect(newTodoLists[0].id).toBe(todoListID2);
})


test('todolist should be added', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: Array<TodoListsType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'qwerty'
    const newTodoListID = v1()

    const newTodoLists = TodoListReducer(state, addTodoListAC(newTodoListID, newTitle))

    expect(newTodoLists.length).toBe(3);
    expect(newTodoLists[0].title).toBe('qwerty');
})


test('todolist should change title', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: Array<TodoListsType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'qwerty'

    const newTodoLists = TodoListReducer(state, editTodoListTitleAC(todoListID2, newTitle))

    expect(newTodoLists.length).toBe(2);
    expect(newTodoLists[1].title).toBe(newTitle);
})


test('todolist should change filter', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const state: Array<TodoListsType> = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ]


    const newTodoLists1 = TodoListReducer(state, filteredTasksAC(todoListID2, 'active'))
    const newTodoLists2 = TodoListReducer(state, filteredTasksAC(todoListID1, 'completed'))

    expect(newTodoLists1[1].filter).toBe('active')
    expect(newTodoLists2[0].filter).toBe('completed')
})