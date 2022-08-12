import {addPostAC, changeNewPostTextAC, ProfileInitialStateType} from "../../../redux/profile-reducer";
import {MyPost} from "./MyPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    profilePage: ProfileInitialStateType
}
type MapDispatchToPropsType = {
    changeNewTextHandler: (text: string) => void
    addPost: () => void
}
export type ProfileToPropsType = MapStateToPropsType & MapDispatchToPropsType


function mapStateToProps(state: AppStateType): MapStateToPropsType {
    return {
        profilePage: state.profilePage
    }
}

function mapDispatchToProps(dispatch: Dispatch): MapDispatchToPropsType {
    return {
        changeNewTextHandler: (text: string) => {
            dispatch(changeNewPostTextAC(text))
        },
        addPost: () => {
            dispatch(addPostAC())
        }
    }
}

export const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)