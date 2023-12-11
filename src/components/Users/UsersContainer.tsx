import React from "react"
import {connect} from "react-redux"
import {AppStateType} from "../../redux/redux-store"
import {
    setTotalCount,
    setUsers,
    toggleIsFetching, UsersInitialStateType,
    UsersType, setFollowingStatusAC, getUsersTC, setCurrentPageTC
} from "../../redux/users-reducer"
import {Users} from "./Users"
import {Preloader} from "../CommonComponents/Preloader/Preloader";

type UsersStateToPropsType = UsersInitialStateType

type UsersDispatchToPropsType = {
    setUsers: (users: UsersType) => void
    setCurrentPage: (currentPage: number, pageSize: number, page: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    setFollowingStatus: (id: number, following: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
export type UsersPropsType = UsersStateToPropsType & UsersDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)

    }

    onClickSetCurrentPage = (pageNumber: number) => {
        this.props.setCurrentPage(this.props.currentPage, this.props.pageSize, pageNumber)
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
                followingUsersID={this.props.followingUsersID}
                setUsers={this.props.setUsers}
                setCurrentPage={this.onClickSetCurrentPage}
                setFollowingStatus={this.props.setFollowingStatus}
                getUsers={this.props.getUsers}
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
        followingUsersID: state.usersPage.followingUsersID
    }
}

export default connect(mapStateToProps, {
    setUsers,
    setCurrentPage: setCurrentPageTC,
    setTotalCount,
    toggleIsFetching,
    setFollowingStatus: setFollowingStatusAC,
    getUsers: getUsersTC
})(UsersContainer)