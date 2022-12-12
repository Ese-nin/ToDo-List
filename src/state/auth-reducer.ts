import {ThunkAppDispatchType} from "../store/store";
import {authAPI, DomainLoginModelType, ResponseCode} from "../api/todolist-api";
import {changeAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ClearDataAC} from "./todolists-reducer";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

// actions

export const SetIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'AUTH/SET_IS_LOGGED_IN', isLoggedIn} as const
}


// thanks

export const loginTC = (data: DomainLoginModelType) => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(SetIsLoggedInAC(true))
                dispatch(changeAppStatusAC('success'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logOutTC = () => (dispatch: ThunkAppDispatchType) => {
    dispatch(changeAppStatusAC("loading"))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(SetIsLoggedInAC(false))
                dispatch(ClearDataAC())
                dispatch(changeAppStatusAC('success'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

// types

export type InitialStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = SetIsLoggedInACType

type SetIsLoggedInACType = ReturnType<typeof SetIsLoggedInAC>