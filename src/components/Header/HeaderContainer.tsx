import React from 'react'
import {connect} from "react-redux";
import {getAuthUserDataTC} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import Header from "./Header";

type HeaderStateToPropsType = {
    isAuth: boolean
    id: number | null
    login: string | null
    email: string | null
}

type HeaderDispatchToPropsType = {
    getAuthUserData: () => void
}

export type HeaderPropsType =
    HeaderStateToPropsType &
    HeaderDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {

    componentDidMount(): void {
        this.props.getAuthUserData()
    }

    render() {
        return <Header
            email={this.props.email}
            id={this.props.id}
            login={this.props.login}
            isAuth={this.props.isAuth}
        />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    email: state.auth.email,
    id: state.auth.id,
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {getAuthUserData: getAuthUserDataTC})(HeaderContainer)