import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {createRoot} from 'react-dom/client'
import {HashRouter} from "react-router-dom";


const root = createRoot(document.getElementById('root') as HTMLElement);

const rerenderEntireTree = () => {
    root.render(
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>)
}

rerenderEntireTree()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', () => rerenderEntireTree)
}