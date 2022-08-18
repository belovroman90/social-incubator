import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../redux/users-reducer";
import {Users} from "./Users";

type UsersStateToPropsType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
}
type UsersDispatchToPropsType = {
    onClickFollow: (id: number) => void
    onClickUnFollow: (id: number) => void
    setUsers: (users: UsersType) => void
}
export type UsersPropsType = UsersStateToPropsType & UsersDispatchToPropsType

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount
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