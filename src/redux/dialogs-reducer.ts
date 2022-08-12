const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'

type DialogsFriendType = {
    id: number
    name: string
}
type DialogsMessageType = {
    id: number
    message: string
}
export type DialogsInitialStateType = {
    dialogsFriends: Array<DialogsFriendType>
    dialogsMessages: Array<DialogsMessageType>
    newMessageText: string
}

type DispatchActionType = ReturnType<typeof changeNewMessageTextAC> | ReturnType<typeof addMessageAC>

type DialogsReducerType = (state: DialogsInitialStateType, action: DispatchActionType) => {
    dialogsFriends: Array<DialogsFriendType>
    dialogsMessages: Array<DialogsMessageType>
    newMessageText: string
}

const initialState: DialogsInitialStateType = {
    dialogsFriends: [
        {id: 1, name: "Aleksandra"},
        {id: 2, name: "Svetlana"},
        {id: 3, name: "Ekaterina"},
        {id: 4, name: "Evgeniya"},
        {id: 5, name: "Kira"},
    ],
    dialogsMessages: [
        {id: 1, message: "What are you waiting for?"},
        {id: 2, message: "Hi! What are you doing?"},
        {id: 3, message: "Hey sweaty!"},
        {id: 4, message: "Call me, baby!"},
        {id: 5, message: "Where are you?"},
    ],
    newMessageText: '',
}

export const dialogsReducer: DialogsReducerType = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newMessageText}
        case ADD_MESSAGE:
            const newMessage = {
                id: 6,
                message: state.newMessageText,
            };
            const stateCopy = {...state, dialogsMessages: [...state.dialogsMessages, newMessage]}
            stateCopy.newMessageText = ''
            return stateCopy
        default:
            return state
    }
}

export const changeNewMessageTextAC = (newMessageText: string) => ({
    type: CHANGE_NEW_MESSAGE_TEXT,
    newMessageText: newMessageText,
} as const)

export const addMessageAC = () => ({
    type: ADD_MESSAGE,
} as const)