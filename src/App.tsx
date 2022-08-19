import React, {FC} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Navigate, Route, Routes} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {AppStateType} from "./redux/redux-store";
import {Dispatch} from "redux";
import UsersContainer from "./components/Users/UsersContainer";

type PropsType = {
    state: AppStateType
    dispatch: Dispatch
}

export const App: FC<PropsType> = (props) => {
    return (
        <div className="main">
            <Header/>
            <div className="nav-content">
                <Navbar/>
                <div className={"content"}>
                    <Routes>
                        <Route
                            path={'/'}
                            element={<Navigate to={'/profile'}/>}
                        />
                        <Route path={"/profile"}
                               element={<Profile
                                   profilePage={props.state.profilePage}
                                   dispatch={props.dispatch}
                               />}
                        />
                        <Route path={"/dialogs"}
                               element={<DialogsContainer/>}/>

                        <Route path={'/users'}
                               element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}