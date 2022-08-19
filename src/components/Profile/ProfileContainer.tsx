import React from "react"
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";

type ProfileStateToPropsType = ProfileType
type ProfileDispatchToPropsType = {
    setUserProfile: (profile: {}) => void
}
type ProfilePropsType = ProfileStateToPropsType & ProfileDispatchToPropsType

export class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            console.log(response.data)
            return setUserProfile(response.data)
        })
    }

    render() {
        return (
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)