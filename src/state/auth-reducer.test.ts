import {authReducer, InitialStateType, SetIsLoggedInAC} from "./auth-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be changed to "true"', () => {
    const newLoggedIn = true;

    const endState = authReducer(startState, SetIsLoggedInAC(newLoggedIn))

    expect(endState.isLoggedIn).toBe(newLoggedIn)
    expect(startState.isLoggedIn).toBe(false)
})