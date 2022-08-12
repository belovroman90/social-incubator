import React from 'react'
import axios from "axios"
import userAvatar from '../../assets/joji.jpg'
import {UsersToPropsType} from "./UsersContainer";
import {UsersType} from "../../redux/users-reducer";

export class Users extends React.Component<UsersToPropsType, UsersType> {

    addUsers = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            console.log(response)
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.addUsers}>ADD USERS</button>
                {this.props.state.users.map(u => {

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