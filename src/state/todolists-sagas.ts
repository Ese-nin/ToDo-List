import {changeAppStatusAC} from "./app-reducer";
import {ResponseCode, ResponseType, todolistAPI, TodolistDomainType} from "../api/todolist-api";
import {fetchTasks} from "./tasks-sagas";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {
    AddTodolistAC,
    ChangeEntityStatusAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    SetTodoAC
} from "./todolists-reducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosResponse} from "axios";

export function* fetchTodolistsWorkerSaga() {
    yield put(changeAppStatusAC('loading'))
    try {
        const res: AxiosResponse<TodolistDomainType[]> = yield call(todolistAPI.getTodolists)
        yield put(SetTodoAC(res.data))
        yield put(changeAppStatusAC('idle'))

        const todos = res.data
        for (let todo of todos) {
            yield put(fetchTasks(todo.id))
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const fetchTodolists = () => ({type: "TODO/FETCH-TODOLISTS"} as const)


export function* createTodolistWorkerSaga(action: ReturnType<typeof createTodolist>) {
    yield put(changeAppStatusAC('loading'))
    try {
        const res: AxiosResponse<ResponseType<{ item: TodolistDomainType }>> = yield call(todolistAPI.createTodolist, action.title)

        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(AddTodolistAC(res.data.data.item))
            yield put(changeAppStatusAC('idle'))
        } else {
            handleServerAppError<{ item: TodolistDomainType }>(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const createTodolist = (title: string) => ({type: "TODO/CREATE-TODOLIST", title} as const)


export function* deleteTodolistWorkerSaga(action: ReturnType<typeof deleteTodolist>) {
    yield put(changeAppStatusAC('loading'))
    yield put(ChangeEntityStatusAC(action.todolistId, 'loading'))
    try {
        const res: AxiosResponse<ResponseType> = yield call(todolistAPI.deleteTodolist, action.todolistId)

        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(RemoveTodolistAC(action.todolistId))
            yield put(changeAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    } finally {
        yield put(ChangeEntityStatusAC(action.todolistId, 'idle'))
    }
}

export const deleteTodolist = (todolistId: string) => ({type: "TODO/DELETE-TODOLIST", todolistId} as const)


export function* changeTodolistWorkerSaga(action: ReturnType<typeof changeTodolist>) {
    yield put(changeAppStatusAC('loading'))
    try {
        const res: AxiosResponse<ResponseType> = yield call(todolistAPI.changeTodolist, action.todolistId, action.title)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(ChangeTodolistTitleAC(action.todolistId, action.title))
            yield put(changeAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const changeTodolist = (todolistId: string, title: string) => ({
    type: "TODO/CHANGE-TODOLIST",
    todolistId,
    title
} as const)

export function* todolistsWatcherSaga() {
    yield takeEvery("TODO/FETCH-TODOLISTS", fetchTodolistsWorkerSaga)
    yield takeEvery("TODO/CREATE-TODOLIST", createTodolistWorkerSaga)
    yield takeEvery("TODO/DELETE-TODOLIST", deleteTodolistWorkerSaga)
    yield takeEvery("TODO/CHANGE-TODOLIST", changeTodolistWorkerSaga)
}