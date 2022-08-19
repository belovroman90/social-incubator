import React from "react"
import {connect} from "react-redux"
import {AppStateType} from "../../redux/redux-store"
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    unFollow, toggleIsFetching, UsersInitialStateType,
    UsersType
} from "../../redux/users-reducer"
import axios from "axios"
import {Users} from "./Users"
import {Preloader} from "../CommonComponents/Preloader/Preloader";

type UsersStateToPropsType = UsersInitialStateType
type UsersDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (users: UsersType) => void
    setCurrentPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
export type UsersPropsType = UsersStateToPropsType & UsersDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalCount(response.data.totalCount.toString())
        })
    }

    onClickSetCurrentPage = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> :
                <div style={{width: '70px', height: '70px'}}></div>}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                setUsers={this.props.setUsers}
                setCurrentPage={this.onClickSetCurrentPage}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching,
})(UsersContainer)