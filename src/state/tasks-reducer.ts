import {clearDataAC} from "./todolists-reducer";
import {AppStatusType} from "./app-reducer";
import {TaskDomainType} from "api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTask, deleteTask, fetchTasks, updateTask} from "./tasks-actions";
import {createTodolist, deleteTodolist, fetchTodolists} from "./todolist-actions";


export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskID: string, status: AppStatusType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index !== -1) {
                tasks[index].entityStatus = action.payload.status
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(clearDataAC, () => {
            return {}
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks.map((el) => ({...el, entityStatus: 'idle'}))
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'})
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.task.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.task.id);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.task}
            }
        })
    }
})

export const tasksReducer = slice.reducer;
export const {changeTaskEntityStatusAC} = slice.actions


// types

export type TasksStateType = {
    [key: string]: TaskType[]
}

type TaskType = TaskDomainType & { entityStatus: AppStatusType }

export type UpdateModelTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}