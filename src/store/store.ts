import {AnyAction, combineReducers} from 'redux';
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../state/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../state/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>