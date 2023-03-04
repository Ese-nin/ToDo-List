import {authAPI, DomainLoginModelType, ResponseCode, ResponseType} from "../api/todolist-api";
import {changeAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {SetIsLoggedInAC} from "./auth-reducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosResponse} from "axios";
import {ClearDataAC} from "./todolists-reducer";

export function* loginWorkerSaga(action: ReturnType<typeof login>) {
    yield put(changeAppStatusAC("loading"))
    try {
        const res: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authAPI.login, action.data)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(SetIsLoggedInAC(true))
            yield put(changeAppStatusAC('success'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const login = (data: DomainLoginModelType) => ({type: "AUTH/LOGIN", data} as const)


export function* logOutWorkerSaga() {
    yield put(changeAppStatusAC("loading"))
    try {
        const res: AxiosResponse<ResponseType> = yield call(authAPI.logout)
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            yield put(SetIsLoggedInAC(false))
            yield put(ClearDataAC())
            yield put(changeAppStatusAC('success'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, yield put)
    }
}

export const logout = () => ({type: "AUTH/LOGOUT"} as const)


export function* authWatcherSaga() {
    yield takeEvery("AUTH/LOGIN", loginWorkerSaga)
    yield takeEvery("AUTH/LOGOUT", logOutWorkerSaga)
}