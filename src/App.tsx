import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "./components/TodoListsList";
import {ErrorAlert} from "./components/ErrorAlert";
import {useAppDispatch, useAppSelector} from "./store/store";
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/Login";
import {initializeApp} from "./state/app-sagas";
import {logout} from "./state/auth-sagas";

function App() {

    const appStatus = useAppSelector(state => state.app.appStatus)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector(st => st.app.isInitialized)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeApp())
    }, [])

    const logoutHandler = () => {
        dispatch(logout())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


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
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {appStatus === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
