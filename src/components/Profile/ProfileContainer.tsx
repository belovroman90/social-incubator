import React from "react"
import {Profile} from "./Profile";
import axios from "axios";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";

type ProfileStateToPropsType = {
    profile: string
}
type ProfileDispatchToPropsType = {
    setUserProfile: (profile: string) => void
}
type ProfilePropsType = ProfileStateToPropsType & ProfileDispatchToPropsType

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
        let userID = this.props.router.params.userID
        if (!userID) userID = 2
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userID}`).then(response => {
            return this.props.setUserProfile(response.data.photos.large)
        })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))