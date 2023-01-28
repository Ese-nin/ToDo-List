import {ResponseType} from "../api/todolist-api";
import {changeAppErrorAC, changeAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    data.messages.length
        ? dispatch(changeAppErrorAC({error: data.messages[0]}))
        : dispatch(changeAppErrorAC({error: 'Some error occurred'}));
    dispatch(changeAppStatusAC({appStatus: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(changeAppErrorAC({error: error.message}))
    dispatch(changeAppStatusAC({appStatus: 'failed'}))
}

