import React from "react"
import {connect} from "react-redux"
import {AppStateType} from "../../redux/redux-store"
import {Dispatch} from "redux"
import {
    followAC,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    unFollowAC,
    UsersType
} from "../../redux/users-reducer"
import axios from "axios"
import {Users} from "./Users"

type UsersStateToPropsType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
type UsersDispatchToPropsType = {
    onClickFollow: (id: number) => void
    onClickUnFollow: (id: number) => void
    setUsers: (users: UsersType) => void
    setCurrentPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
}
export type UsersPropsType = UsersStateToPropsType & UsersDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount.toString())
        })
    }

    onClickSetCurrentPage = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return <Users
            users={this.props.users}
            pageSize={this.props.pageSize}
            totalUsersCount={this.props.totalUsersCount}
            currentPage={this.props.currentPage}
            setUsers={this.props.setUsers}
            setCurrentPage={this.onClickSetCurrentPage}
            onClickFollow={this.props.onClickFollow}
            onClickUnFollow={this.props.onClickUnFollow}
        />
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        },
        setCurrentPage: (page: number) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalCount: (totalCount: number) => {
            dispatch(setTotalCountAC(totalCount))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)