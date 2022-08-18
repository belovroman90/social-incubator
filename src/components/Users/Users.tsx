import React from 'react'
import axios from "axios"
import classes from "./Users.module.css"
import userAvatar from '../../assets/joji.jpg'
import {UsersPropsType} from "./UsersContainer";
import {UsersType} from "../../redux/users-reducer";

export class Users extends React.Component<UsersPropsType, UsersType> {

    componentDidMount(): void {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            console.log(response)
            this.props.setUsers(response.data.items)
        })
    }

    render() {

        const pagesCount = this.props.totalUsersCount / this.props.pageSize
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div>

                <div>
                    {pages.map(p => {
                        return <span className={classes.selectedPage}>{p}</span>
                    })}
                </div>

                {this.props.users.map(u => {

                    return (
                        <div key={u.id}>
                        <span>
                            <img src={u.photos.small ? u.photos.small : userAvatar} alt="avatar"/>
                            {u.followed ? <button
                                    onClick={() => this.props.onClickUnFollow(u.id)}
                                >UnFollow</button> :
                                <button
                                    onClick={() => this.props.onClickFollow(u.id)}
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
}