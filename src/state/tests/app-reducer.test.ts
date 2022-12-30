import {AppInitStatePropsType, appReducer, changeAppStatusAC, changeAppErrorAC, setInitializedAC} from "../app-reducer";

let startState: AppInitStatePropsType;

beforeEach(() => {
    startState = {
        appStatus: 'idle',
        error: '',
        isInitialized: false
    }
})

test('appStatus should be changed', () => {
    const newAppStatus = 'loading';

    const endState = appReducer(startState, changeAppStatusAC(newAppStatus))

    expect(endState.appStatus).toBe(newAppStatus)
})

test('error should be changed', () => {
    const newError = 'Some error'

    const endState = appReducer(startState, changeAppErrorAC(newError))

    expect(endState.error).toBe(newError)
})

test('isInitialized should became "true"', () => {
    const newInitialize = true;

    const endState = appReducer(startState, setInitializedAC(newInitialize))

    expect(endState.isInitialized).toBe(newInitialize)
})