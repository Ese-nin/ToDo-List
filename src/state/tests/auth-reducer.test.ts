import {authReducer, setIsLoggedInAC} from "../auth-reducer";

let startState: any;
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be changed to "true"', () => {
    const newLoggedIn = true;

    const endState = authReducer(startState, setIsLoggedInAC({isLoggedIn: newLoggedIn}))

    expect(endState.isLoggedIn).toBe(newLoggedIn)
    expect(startState.isLoggedIn).toBe(false)
})