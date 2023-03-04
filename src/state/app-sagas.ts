import {call, put, takeEvery} from "redux-saga/effects";
import {authAPI, IsAutorizedResponseType, ResponseCode, ResponseType} from "../api/todolist-api";
import {SetIsLoggedInAC} from "./auth-reducer";
import {setInitializedAC} from "./app-reducer";
import {AxiosResponse} from "axios";

export function* initializeAppWorkerSaga() {
    const res: AxiosResponse<ResponseType<IsAutorizedResponseType>> = yield call(authAPI.me)
    if (res.data.resultCode === ResponseCode.SUCCESS) {
        yield put(SetIsLoggedInAC(true));
    } else {

    }
    yield put(setInitializedAC(true))
}

export const initializeApp = () => ({type: "APP/INITIALIZE-APP"} as const)


export function* appWatcherSaga() {
    yield takeEvery("APP/INITIALIZE-APP", initializeAppWorkerSaga)
}