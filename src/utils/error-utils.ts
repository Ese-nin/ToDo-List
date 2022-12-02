import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "react";
import {AppReducerActionsType, changeAppErrorAC, changeAppStatusAC} from "../state/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    data.messages.length
        ? dispatch(changeAppErrorAC(data.messages[0]))
        : dispatch(changeAppErrorAC('Some error occurred'));
    dispatch(changeAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(changeAppErrorAC(error.message))
    dispatch(changeAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppReducerActionsType>