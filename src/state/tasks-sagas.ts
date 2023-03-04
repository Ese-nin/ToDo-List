import {call, put, select, takeEvery} from "redux-saga/effects";
import {changeAppStatusAC} from "./app-reducer";
import {AxiosError, AxiosResponse} from "axios";
import {GetTasksResponseType, ResponseCode, taskAPI, TaskDomainType, TaskResponseType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {
    addTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    TasksStateType,
    UpdateModelTaskType,
    updateTaskAC
} from "./tasks-reducer";

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    try {
        yield put(changeAppStatusAC('loading'))
        const res: AxiosResponse<GetTasksResponseType> = yield call(taskAPI.getTasks, action.todolistId)

        yield put(setTasksAC(action.todolistId, res.data.items))
        yield put(changeAppStatusAC('idle'))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const fetchTasks = (todolistId: string) => {
    return {type: "TASKS/FETCH-TASKS", todolistId} as const
}

export function* createTaskWorkerSaga(action: ReturnType<typeof createTask>) {
    yield put(changeAppStatusAC('loading'))
    try {
        const res: AxiosResponse<TaskResponseType<{ item: TaskDomainType }>> = yield call(taskAPI.createTask, action.todolistId, action.title)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(addTaskAC(res.data.data.item))
            yield put(changeAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const createTask = (todolistId: string, title: string) => ({
    type: "TASKS/CREATE-TASK",
    todolistId,
    title
} as const)


export function* deleteTaskWorkerSaga(action: ReturnType<typeof deleteTask>) {
    const {todolistId, taskId} = action
    yield put(changeAppStatusAC('loading'))
    yield put(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    try {
        const res: AxiosResponse<TaskResponseType> = yield call(taskAPI.deleteTask, todolistId, taskId)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(removeTaskAC(todolistId, taskId))
            yield put(changeAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    } finally {
        yield put(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
    }
}

export const deleteTask = (todolistId: string, taskId: string) => ({
    type: "TASKS/DELETE-TASK",
    todolistId,
    taskId
} as const)


export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
    const {todolistId, taskId, domainModel} = action
    yield put(changeAppStatusAC('loading'))
    yield put(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    const tasks: TasksStateType = yield select(state => state.tasks)
    const task = tasks[todolistId].find(t => t.id === taskId)
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
        try {
            const res: AxiosResponse<TaskResponseType<{ item: TaskDomainType }>> = yield call(taskAPI.changeTask, todolistId, taskId, model)

            if (res.data.resultCode === ResponseCode.SUCCESS) {
                yield put(updateTaskAC(res.data.data.item))
                yield put(changeAppStatusAC('idle'))
            } else {
                handleServerAppError(res.data, yield put)
            }
        } catch (error) {
            const err = error as AxiosError
            handleServerNetworkError(err, yield put)
        } finally {
            yield put(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
        }
    }
}

export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateModelTaskType) => ({
    type: "TASKS/UPDATE-TASK",
    todolistId,
    taskId,
    domainModel
} as const)


export function* tasksWatcherSaga() {
    yield takeEvery("TASKS/FETCH-TASKS", fetchTasksWorkerSaga)
    yield takeEvery("TASKS/CREATE-TASK", createTaskWorkerSaga)
    yield takeEvery("TASKS/DELETE-TASK", deleteTaskWorkerSaga)
    yield takeEvery("TASKS/UPDATE-TASK", updateTaskWorkerSaga)
}