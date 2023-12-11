import React, {ComponentType} from 'react'
import {Navigate} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = <T, >(Component: ComponentType<T>) => {

    function RedirectComponent(props: MapStateToPropsType) {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}

// types
type MapStateToPropsType = {
    isAuth: boolean
}