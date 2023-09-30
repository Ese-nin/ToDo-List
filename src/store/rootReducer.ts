import {combineReducers} from "redux";
import {tasksReducer} from "state/tasks-reducer";
import {todolistsReducer} from "state/todolists-reducer";
import {appReducer} from "state/app-reducer";
import {authReducer} from "state/auth-reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})