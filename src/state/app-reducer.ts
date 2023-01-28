import {authAPI, IsAutorizedResponseType, ResponseCode} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState = {
    appStatus: 'idle',
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeAppStatusAC(state, action: PayloadAction<{ appStatus: AppStatusType }>) {
            state.appStatus = action.payload.appStatus
        },
        changeAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})


export const appReducer = slice.reducer
export const {setInitializedAC, changeAppStatusAC, changeAppErrorAC} = slice.actions


// thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        } else {
            handleServerAppError<IsAutorizedResponseType>(res.data, dispatch)
        }
    })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setInitializedAC({isInitialized: true}))
        })
}


// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'