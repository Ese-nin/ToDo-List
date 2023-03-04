import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import {TodolistActionsType, todolistsReducer} from "../state/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionsType} from "../state/app-reducer";
import {AuthActionsType, authReducer} from "../state/auth-reducer";
import createSagaMiddleware from 'redux-saga'
import {appWatcherSaga} from "../state/app-sagas";
import {tasksWatcherSaga} from "../state/tasks-sagas";
import {all} from "redux-saga/effects";
import {todolistsWatcherSaga} from "../state/todolists-sagas";
import {authWatcherSaga} from "../state/auth-sagas";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppActionsType = TodolistActionsType | TasksActionsType | AppReducerActionsType | AuthActionsType
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([
        appWatcherSaga(),
        tasksWatcherSaga(),
        todolistsWatcherSaga(),
        authWatcherSaga()
    ])
}


// типизация санок для работы с react 18
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>