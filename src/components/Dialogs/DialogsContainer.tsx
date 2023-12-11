import React, {KeyboardEvent} from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addMessageAC, changeNewMessageTextAC, DialogsInitialStateType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {withAuthRedirect} from "../../HOC/AuthRedirect";


function mapStateToProps(state: AppStateType): MapStateToPropsType {
    return {
        dialogsPage: state.dialogsPage
    }
}

function mapDispatchToProps(dispatch: Dispatch): MapDispatchToPropsType {
    return {
        onChangeTextArea: (text: string) => {
            dispatch(changeNewMessageTextAC(text))
        },
        onEnterAddMessage: (e: KeyboardEvent<HTMLTextAreaElement>) => {
            e.key === 'Enter' && dispatch(addMessageAC())
        },
        onClickAddMessage: () => {
            dispatch(addMessageAC())
        }
    }
}

const AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

// types

export type MapStateToPropsType = {
    dialogsPage: DialogsInitialStateType
}

export type MapDispatchToPropsType = {
    onChangeTextArea: (text: string) => void
    onEnterAddMessage: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    onClickAddMessage: () => void
}

export type DialogsToPropsType = MapStateToPropsType & MapDispatchToPropsType