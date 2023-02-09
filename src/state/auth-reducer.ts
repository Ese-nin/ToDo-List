import {authAPI, DomainLoginModelType, FieldErrorsType, ResponseCode} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {changeAppStatusAC} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {clearDataAC} from "./todolists-reducer";

export const login = createAsyncThunk<void, DomainLoginModelType, {
    rejectValue: { errors: string[], fieldsErrors?: FieldErrorsType[] }
}>('auth/login',
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(changeAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authAPI.login(param)

            if (res.data.resultCode === ResponseCode.SUCCESS) {
                dispatch(changeAppStatusAC({appStatus: 'success'}))
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            const error = err as AxiosError;
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logOut = createAsyncThunk('auth/logOut', async (param, {dispatch, rejectWithValue}) => {
    dispatch(changeAppStatusAC({appStatus: "loading"}))
    try {
        const res = await authAPI.logout()

        if (res.data.resultCode === ResponseCode.SUCCESS) {
            dispatch(clearDataAC())
            dispatch(changeAppStatusAC({appStatus: 'success'}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logOut.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;