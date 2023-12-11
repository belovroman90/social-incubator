import React, {FC} from 'react'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {setStatusAC, setUsersAC, statuses} from "../../redux/friends-reducer";
import axios from "axios";
import {UsersType, UserType} from "../../redux/users-reducer";
import userAvatar from "../../assets/avatar_2.jpg"

type AxiosGetType = {
    items: UsersType
    totalCount: number
    error: any
}

type MapStateToPropsType = {
    users: any
    status: string
}
type MapDispatchToPropsType = {
    setUsers: (users: any) => void
    setStatus: (status: string) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const Friends: FC<PropsType> = (props) => {

    if (props.status === statuses.NOT_INITIALIZED) {
        props.setStatus(statuses.INPROGRESS)
        axios
            .get<AxiosGetType>('https://social-network.samuraijs.com/api/1.0/users?count=20')
            .then((res) => {
                props.setStatus(statuses.SUCCESS)
                props.setUsers(res.data.items)
            })
    }

    if (!props.users.length) {
        return <div>Users not found</div>
    }

    const users = props.users.map((u: UserType) => {

        return (
            <li>
                <span>{u.name}</span>
                <img src={u.photos.small !== null ?
                    u.photos.small : userAvatar}
                     alt="avatar"
                     style={{width: '70px'}}
                />
            </li>

        )
    })

    return (
        <div style={{width: "1000px"}}>
            Friends Component
            <ul>{users}</ul>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.friendsPage.users,
        status: state.friendsPage.status
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        },
        setStatus: (status: string) => {
            dispatch(setStatusAC(status))
        }
    }
}

export const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends)