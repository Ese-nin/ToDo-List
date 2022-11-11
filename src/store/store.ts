import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)