import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import s from "./Dialogs.module.css";
import {FriendDialogItem} from "./DialogItem/FriendDialogItem";
import {DialogsToPropsType} from "./DialogsContainer";
import {Message} from "./Message/Message";

type PropsType = DialogsToPropsType

const Dialogs: FC<PropsType> = (props) => {

    const friendsElements = props.dialogsPage.dialogsFriends.map(el => {
        return (
            <li key={el.id}>
                <FriendDialogItem name={el.name} id={el.id}/>
            </li>
        )
    })

    const messagesElements = props.dialogsPage.dialogsMessages.map(el => {

        return (
            <li key={el.id}>
                <Message message={el.message}/>
            </li>
        )
    })

    function onChangeTextarea(e: ChangeEvent<HTMLTextAreaElement>) {
        props.onChangeTextArea(e.currentTarget.value)
    }

    function onEnterAddMessage(e: KeyboardEvent<HTMLTextAreaElement>) {
        e.key === 'Enter' && props.onEnterAddMessage(e)
    }

    function onClickAddMessage() {
        props.onClickAddMessage()
    }

    return (
        <div>
            <div className={s.dialogs}>
                <ul className={s.dialogsItems}>
                    {friendsElements}
                </ul>
                <ul className={s.messages}>
                    {messagesElements}
                </ul>
            </div>
            <textarea
                value={props.dialogsPage.newMessageText}
                className={s.textarea}
                onChange={onChangeTextarea}
                onKeyPress={onEnterAddMessage}
            >`</textarea>
            <button onClick={onClickAddMessage}>+</button>
        </div>
    )
}

export default Dialogs;