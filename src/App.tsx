import React, {FC} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {AppStateType} from "./redux/redux-store";
import {Dispatch} from "redux";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {FriendsContainer} from "./components/Users/Friends";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";

type PropsType = {
    state: AppStateType
    dispatch: Dispatch
}

export const App: FC<PropsType> = (props) => {
    return <div className="main">
        <HeaderContainer/>
        <div className="nav-content">
            <Navbar/>
            <div className={"content"}>
                <Routes>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path={"/profile/:userID"}
                           element={<ProfileContainer/>}
                    />
                    <Route path={"/header"} element={<HeaderContainer/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={"/dialogs"}
                           element={<DialogsContainer/>}/>

                    <Route path={'/users'}
                           element={<UsersContainer/>}/>
                    <Route path={'/friends'} element={<FriendsContainer/>}/>
                    <Route path='/' element={<ProfileContainer/>}/>
                </Routes>
            </div>
        </div>
    </div>
}