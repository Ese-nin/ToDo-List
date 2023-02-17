import React from 'react';
import {
    changeEntityStatusAC,
    changeTodolistFilterAC,
    clearDataAC,
    FilterValuesType,
    todolistsReducer
} from '../todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../components/TodoListsList";
import {changeTodolistTitle, createTodolist, deleteTodolist, fetchTodolists} from "../todolist-actions";

let startState: Array<TodolistType>;
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, deleteTodolist.fulfilled({todolistId: todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, createTodolist.fulfilled({
        todolist: {
            id: todolistId2,
            title: newTodolistTitle,
            addedDate: '',
            order: 0
        }
    }, 'requestId', newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const param = {todolistId: todolistId2, title: newTodolistTitle}
    const action = changeTodolistTitle.fulfilled(param, 'requestId', {todolistID: todolistId2, title: newTodolistTitle});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('actual todos should be added', () => {


    startState = []
    const todolists = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0}
    ]

    const action = fetchTodolists.fulfilled({todolists: todolists}, 'requestId');

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
});


test('entityStatus should be changed', () => {
    const newStatus = 'loading'

    const endState = todolistsReducer(startState, changeEntityStatusAC({
        todolistId: todolistId2,
        entityStatus: newStatus
    }))

    expect(endState[1].entityStatus).toBe(newStatus)
    expect(endState[0].entityStatus).toBe('idle')
})

test('state must be reset', () => {

    const endState = todolistsReducer(startState, clearDataAC())

    expect(endState).toStrictEqual([])
})