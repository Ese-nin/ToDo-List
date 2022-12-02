const InitState: AppInitStatePropsType = {
    appStatus: 'idle',
    error: null
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


// types
export type AppStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppInitStatePropsType = {
    appStatus: AppStatusType
    error: string | null
}


export type AppReducerActionsType = ChangeAppStatusType
    | ChangeAppErrorType

export type ChangeAppStatusType = ReturnType<typeof changeAppStatusAC>
export type ChangeAppErrorType = ReturnType<typeof changeAppErrorAC>