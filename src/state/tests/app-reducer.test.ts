import {appReducer, changeAppErrorAC, changeAppStatusAC, initializeApp} from "../app-reducer";

let startState: any;

beforeEach(() => {
    startState = {
        appStatus: 'idle',
        error: '',
        isInitialized: false
    }
})

test('appStatus should be changed', () => {
    const newAppStatus = 'loading';

    const endState = appReducer(startState, changeAppStatusAC({appStatus: newAppStatus}))

    expect(endState.appStatus).toBe(newAppStatus)
})

test('error should be changed', () => {
    const newError = 'Some error'

    const endState = appReducer(startState, changeAppErrorAC({error: newError}))

    expect(endState.error).toBe(newError)
})

test('isInitialized should became "true"', () => {
    const newInitialize = true;

    const endState = appReducer(startState, initializeApp.fulfilled({isInitialized: newInitialize}, ''))

    expect(endState.isInitialized).toBe(newInitialize)
})