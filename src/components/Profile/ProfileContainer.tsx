import React from "react"
import {Profile} from "./Profile";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getUserProfileTC} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../HOC/AuthRedirect";


function withRouter(Component: any) {
    function ComponentWithRouterProp(props: ProfilePropsType) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        )
    }

    return ComponentWithRouterProp
}

class ProfileContainer extends React.Component<any> {

    componentDidMount(): void {
        console.log(this.props.router.params)
        let userID = this.props.router.params.userID
        if (!userID) userID = 2
        this.props.getUserProfile(userID)
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                isFetching={this.props.isFetching}
                isAuth={this.props.isAuth}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isFetching: state.profilePage.fetching,
    }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile: getUserProfileTC})(withRouter(AuthRedirectComponent))

// types
type MapStateToPropsType = {
    profile: string
    isFetching: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userID: number) => void
}
type ProfilePropsType = MapStateToPropsType & MapDispatchToPropsType