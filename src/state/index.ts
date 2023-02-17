import * as asyncTasksActions from './tasks-actions'
import * as asyncTodoActions from './todolist-actions'
import {slice as todoSlice} from './todolists-reducer'
import {slice as tasksSlice} from './tasks-reducer'

const todoActions = {
    ...asyncTodoActions,
    ...todoSlice.actions
}

const tasksActions = {
    ...asyncTasksActions,
    ...tasksSlice.actions
}

export {
    tasksActions,
    todoActions
}