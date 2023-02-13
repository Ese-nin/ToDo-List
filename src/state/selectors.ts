import {AppRootStateType} from "../store/store";

// app-reducer

export const appStatusSelector = (state: AppRootStateType) => state.app.appStatus
export const errorSelector = (state: AppRootStateType) => state.app.error
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized

// auth-reducer

export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn

// tasks-reducer

export const tasksSelector = (state: AppRootStateType) => state.tasks

// todolists-reducer

export const todolistsSelector = (state: AppRootStateType) => state.todoLists