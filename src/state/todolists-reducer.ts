import {TodolistType} from "components/TodoListsList";
import {AppStatusType} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTodolistTitle, createTodolist, deleteTodolist, fetchTodolists} from "./todolist-actions";


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: AppStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearDataAC() {
            return []
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
    }
})


export const todolistsReducer = slice.reducer;
export const {
    changeTodolistFilterAC,
    changeEntityStatusAC,
    clearDataAC
} = slice.actions


// types

export type FilterValuesType = "all" | "active" | "completed";