import {authAPI, ResponseCode} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const initializeApp = createAsyncThunk('app/initialize', async (param, {
    dispatch,
}) => {
    try {
        const res = await authAPI.me()

        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        }
    } catch (err) {
        const error = err as AxiosError;
        handleServerNetworkError(error, dispatch)
    } finally {
        return {isInitialized: true}
    }
})


const slice = createSlice({
    name: 'app',
    initialState: {
        appStatus: 'idle',
        error: null as string | null,
        isInitialized: false
    },
    reducers: {
        changeAppStatusAC(state, action: PayloadAction<{ appStatus: AppStatusType }>) {
            state.appStatus = action.payload.appStatus
        },
        changeAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isInitialized = action.payload.isInitialized
        })
    }
})


export const appReducer = slice.reducer
export const {changeAppStatusAC, changeAppErrorAC} = slice.actions


// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'