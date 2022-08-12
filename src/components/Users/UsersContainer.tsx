import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unFollowAC, UsersInitialStateType, UsersType} from "../../redux/users-reducer";
import {Users} from "./Users";

type UsersStateToPropsType = {
    state: UsersInitialStateType
}
type UsersDispatchToPropsType = {
    onClickFollow: (id: number) => void
    onClickUnFollow: (id: number) => void
    setUsers: (users: UsersType) => void
}
export type UsersToPropsType = UsersStateToPropsType & UsersDispatchToPropsType

const mapStateToProps = (state: AppStateType) => {
    return {
        state: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClickFollow: (id: number) => {
            dispatch(followAC(id))
        },
        onClickUnFollow: (id: number) => {
            dispatch(unFollowAC(id))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)