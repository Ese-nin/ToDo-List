import React from 'react';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, SetTodoAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../components/TodoListsList";

let startState: Array<TodolistType>;
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(()=>{
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC({id: todolistId2, title: newTodolistTitle, addedDate: '', order: 0}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = ChangeTodolistFilterAC(todolistId2, newFilter);

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

    const action = SetTodoAC(todolists);

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
});
