import {addTodolistAC, removeTodolistAC, setTodoAC} from "./todolists-reducer";
import {AppThunk} from "../store/store";
import {AppStatusType, changeAppStatusAC} from "./app-reducer";
import {ResponseCode, taskAPI, TaskDomainType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: TaskDomainType[] }>) {
            state[action.payload.todolistID] = action.payload.tasks.map((el) => ({...el, entityStatus: 'idle'}))
        },
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskID: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskDomainType }>) {
            state[action.payload.task.todoListId].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC(state, action: PayloadAction<{ task: TaskDomainType }>) {
            const tasks = state[action.payload.task.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.task.id);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.task}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskID: string, status: AppStatusType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index !== -1) {
                tasks[index].entityStatus = action.payload.status
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setTodoAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
    }
})

export const tasksReducer = slice.reducer;
export const {setTasksAC, removeTaskAC, updateTaskAC, addTaskAC, changeTaskEntityStatusAC} = slice.actions

// thunk
export const SetTasksTC = (todolistID: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    taskAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC({todolistID, tasks: res.data.items}))
            dispatch(changeAppStatusAC({appStatus: 'idle'}))
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const CreateTasksTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    taskAPI.createTask(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(changeAppStatusAC({appStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const DeleteTasksTC = (todolistId: string, taskID: string): AppThunk => (dispatch) => {
    dispatch(changeAppStatusAC({appStatus: 'loading'}))
    dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'loading'}))
    taskAPI.deleteTask(todolistId, taskID)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(removeTaskAC({todolistId, taskID}))
                dispatch(changeAppStatusAC({appStatus: 'idle'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'idle'}))
        })
}
export const UpdateTaskTC = (todolistId: string, taskID: string, domainModel: UpdateModelTaskType): AppThunk =>
    (dispatch, getState) => {
        dispatch(changeAppStatusAC({appStatus: 'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'loading'}))
        const task = getState().tasks[todolistId].find(t => t.id === taskID)

        if (task) {
            const model: UpdateModelTaskType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }

            taskAPI.changeTask(todolistId, taskID, model)
                .then((res) => {
                    if (res.data.resultCode === ResponseCode.SUCCESS) {
                        dispatch(updateTaskAC({task: res.data.data.item}))
                        dispatch(changeAppStatusAC({appStatus: 'idle'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((err) => {
                    handleServerNetworkError(err, dispatch)
                })
                .finally(() => {
                    dispatch(changeTaskEntityStatusAC({todolistId, taskID, status: 'idle'}))
                })
        }
    }


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