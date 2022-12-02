import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import {TodolistActionsType, todolistsReducer} from "../state/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionsType} from "../state/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppActionsType = TodolistActionsType | TasksActionsType | AppReducerActionsType
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// типизация санок для работы с react 18
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>