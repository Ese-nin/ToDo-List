import {initializeApp} from "./app-sagas";

const InitState: AppInitStatePropsType = {
    appStatus: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: AppInitStatePropsType = InitState, action: AppReducerActionsType): AppInitStatePropsType => {
    switch (action.type) {
        case 'APP/CHANGE_STATUS':
            return {
                ...state,
                appStatus: action.payload.appStatus
            }
        case "APP/CHANGE_ERROR":
            return {
                ...state, error: action.error
            }
        case 'APP/SET_INITIALIZED':
            return {
                ...state, isInitialized: action.isInitialized
            }
        default:
            return state
    }
}


// actions

export const changeAppStatusAC = (status: AppStatusType) => {
    return {
        type: 'APP/CHANGE_STATUS',
        payload: {
            appStatus: status
        }
    } as const
}
export const changeAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/CHANGE_ERROR', error
    } as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET_INITIALIZED', isInitialized
    } as const
}

// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitStatePropsType = {
    appStatus: AppStatusType
    error: string | null
    isInitialized: boolean
}


export type AppReducerActionsType = ChangeAppStatusType
    | ChangeAppErrorType
    | SetInitializedType | ReturnType<typeof initializeApp>

export type ChangeAppStatusType = ReturnType<typeof changeAppStatusAC>
export type ChangeAppErrorType = ReturnType<typeof changeAppErrorAC>
export type SetInitializedType = ReturnType<typeof setInitializedAC>