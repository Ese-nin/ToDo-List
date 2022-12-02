import {AppInitStatePropsType, appReducer, changeAppStatusAC, changeAppErrorAC} from "./app-reducer";

let startState: AppInitStatePropsType;

beforeEach(()=>{
    startState = {
        appStatus: 'idle',
        error: ''
    }
})

test( 'appStatus should be changed',()=>{
    const newAppStatus = 'loading';

    const endState = appReducer(startState, changeAppStatusAC(newAppStatus))

    expect(endState.appStatus).toBe(newAppStatus)
})

test('error should be changed', () => {
    const newError = 'Some error'

    const endState = appReducer(startState, changeAppErrorAC(newError))

    expect(endState.error).toBe(newError)
})