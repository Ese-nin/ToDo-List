import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "./components/TodoListsList";
import {ErrorAlert} from "./components/ErrorAlert";
import {useAppSelector} from "./store/store";

function App() {

    const appStatus = useAppSelector(state => state.app.appStatus)

    return (
        <div className="App">
            <ErrorAlert/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {appStatus === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    );
}

export default App;
