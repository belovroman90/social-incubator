import React, {FC} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {AppStateType} from "./redux/redux-store";
import {Dispatch} from "redux";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

type PropsType = {
    state: AppStateType
    dispatch: Dispatch
}

export const App: FC<PropsType> = (props) => {
    return <div className="main">
        <Header/>
        <div className="nav-content">
            <Navbar/>
            <div className={"content"}>
                <Routes>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path={"/profile/:userID"}
                           element={<ProfileContainer/>}
                    />
                    <Route path={"/dialogs"}
                           element={<DialogsContainer/>}/>

                    <Route path={'/users'}
                           element={<UsersContainer/>}/>
                    <Route path='/' element={<ProfileContainer/>}/>
                </Routes>
            </div>
        </div>
    </div>
}