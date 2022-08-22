import React from 'react';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((s, index) => {
                    return (
                        <li key={s.id}>
                            <input type="checkbox" checked={s.isDone}/>
                            <span>{s.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Finished</button>
            </div>
        </div>
    );
};

export default TodoList;