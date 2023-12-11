const SET_USERS = 'SN/FRIENDS/SET_USERS'
const SET_STATUS = 'SN/FRIENDS/SET_STATUS'

type InitialStateType = {
    users: any
    status: string
}

const initialState = {
    users: [],
    status: 'NOT-INITIALIZED'
}

type ActionType = { type: 'SN/FRIENDS/SET_USERS', users: [] } | { type: 'SN/FRIENDS/SET_STATUS', status: string }


export const statuses = {
    NOT_INITIALIZED: 'NOT-INITIALIZED',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    SUCCESS: 'SUCCESS',
}

export const friendsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_USERS: {
            return {...state, users: action.users}
        }
        default:
            return state
    }
}

export const setUsersAC = (users: any) => {
    return {type: SET_USERS, users}
}
export const setStatusAC = (status: string) => {
    return {type: SET_STATUS, status}
}