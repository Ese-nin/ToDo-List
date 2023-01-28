import {authAPI, DomainLoginModelType, ResponseCode} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {changeAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;


// thanks

export const loginTC = (data: DomainLoginModelType) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({appStatus: "loading"}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(changeAppStatusAC({appStatus: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({appStatus: "loading"}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                // dispatch(clearDataAC())
                dispatch(changeAppStatusAC({appStatus: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}