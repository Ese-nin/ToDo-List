import React, {useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import AddItem from "./AddItem";
import {useAppSelector} from "store/store";
import {FilterValuesType,} from "state/todolists-reducer";
import {TodolistDomainType} from "api/todolist-api";
import {AppStatusType} from "state/app-reducer";
import {Navigate} from "react-router-dom";
import {isLoggedInSelector, tasksSelector, todolistsSelector} from "state/selectors";
import {useActions} from "utils/useActions";
import {todoActions} from "state";

export type TodolistType = TodolistDomainType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export const TodoListsList = () => {

    const todolists = useAppSelector(todolistsSelector)
    const tasks = useAppSelector(tasksSelector)
    const isLoggedIn = useAppSelector(isLoggedInSelector)

    const {createTodolist, fetchTodolists} = useActions(todoActions)

    useEffect(() => {
        if (isLoggedIn && !todolists.length) {
            fetchTodolists()
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItem callback={createTodolist}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: "scroll", height: "85vh"}}>
                {
                    todolists.map(tl => {

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px', width: "280px", position: "relative"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
};