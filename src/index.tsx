import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {App} from "./App";
import './index.css';
import {Provider} from "react-redux";
import {store} from "./redux/redux-store";
//react-scripts --openssl-legacy-provider start
ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>

    , document.getElementById('root')
);


reportWebVitals();