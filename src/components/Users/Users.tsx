import React, {FC} from "react"
import classes from "./Users.module.css"
import userAvatar from "../../assets/joji.jpg"
import {followTC, unFollowTC, UsersType} from "../../redux/users-reducer"
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppThunkDispatch} from "../../redux/redux-store";

type PropsType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingUsersID: number[]
    setUsers: (users: UsersType) => void
    setCurrentPage: (pageNumber: number) => void
    setFollowingStatus: (id: number, following: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export const Users: FC<PropsType> = (props) => {

    const dispatch = useDispatch<AppThunkDispatch>()

    const pagesCount = Math.ceil(props.totalUsersCount / 2000 / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={classes.pages}>
                {pages.map(p => {
                    return <span
                        key={p}
                        className={props.currentPage === p ? classes.selectedPage : classes.page}
                        onClick={() => props.setCurrentPage(p)}
                    >{p}</span>
                })}
            </div>

            {props.users.map(u => {

                return (
                    <div key={u.id}>
                        <span>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small ? u.photos.small : userAvatar} alt="avatar"/>
                            </NavLink>

                            {u.followed ? <button onClick={() => {
                                    dispatch(unFollowTC(u.id))
                                }}
                                                  disabled={props.followingUsersID.some(id => id === u.id) && u.followed}
                                >UnFollow</button> :

                                <button onClick={() => {
                                    dispatch(followTC(u.id))
                                }}
                                        disabled={props.followingUsersID.some(id => id === u.id) && !u.followed}
                                >Follow</button>}

                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}