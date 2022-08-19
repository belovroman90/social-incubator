import React, {FC} from "react"
import classes from "./UsersAPIComponent.module.css"
import userAvatar from "../../assets/joji.jpg"
import {UsersType} from "../../redux/users-reducer"

type PropsType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setUsers: (users: UsersType) => void
    setCurrentPage: (pageNumber: number) => void
    onClickFollow: (id: number) => void
    onClickUnFollow: (id: number) => void
}

export const Users: FC<PropsType> = (props) => {

    const pagesCount = Math.ceil(props.totalUsersCount / 500 / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>

            <div>
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p ? classes.selectedPage : classes.page}
                        onClick={() => props.setCurrentPage(p)}
                    >{p}</span>
                })}
            </div>

            {props.users.map(u => {

                return (
                    <div key={u.id}>
                        <span>
                            <img src={u.photos.small ? u.photos.small : userAvatar} alt="avatar"/>
                            {u.followed ? <button
                                    onClick={() => props.onClickUnFollow(u.id)}
                                >UnFollow</button> :
                                <button
                                    onClick={() => props.onClickFollow(u.id)}
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