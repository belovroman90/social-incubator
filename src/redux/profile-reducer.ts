import {Dispatch} from "redux";
import {usersAPI} from "../api";

const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'
const SET_FETCHING_STATUS = 'SET-FETCHING-STATUS'

const initialState: ProfileInitialStateType = {
    postsMessages: [
        {id: 1, post: "How are you?"},
        {id: 2, post: "What are you looking that?"},
        {id: 3, post: "What i am doing?"},
    ],
    newPostText: "",
    profile: '',
    fetching: false
}

export const profileReducer = (state = initialState, action: DispatchActionType): ProfileInitialStateType => {
    switch (action.type) {
        case CHANGE_NEW_POST_TEXT:
            return {...state, newPostText: action.newPostText}
        case ADD_POST:
            const newPost = {
                id: 5,
                post: state.newPostText,
            };
            const stateCopy = {...state, postsMessages: [...state.postsMessages, newPost]}
            stateCopy.newPostText = ""
            return stateCopy
        case SET_USERS_PROFILE:
            return {...state, profile: action.payload}
        case SET_FETCHING_STATUS:
            return {...state, fetching: action.payload.fetching}
        default:
            return state
    }
}

// actions
export const changeNewPostTextAC = (newPostText: string) => ({
    type: CHANGE_NEW_POST_TEXT,
    newPostText: newPostText,
} as const)
export const addPostAC = () => ({
    type: ADD_POST,
} as const)
const setUserProfile = (profile: string) => ({type: SET_USERS_PROFILE, payload: profile} as const)
const setFetchingStatusAC = (fetching: boolean) => ({type: SET_FETCHING_STATUS, payload: {fetching}} as const)


// thunks
export const getUserProfileTC = (userID: number) => (dispatch: Dispatch) => {
    dispatch(setFetchingStatusAC(true))
    usersAPI.getProfile(userID).then(response => {
        dispatch(setUserProfile(response.photos.large))
        dispatch(setFetchingStatusAC(false))
    })
}

// types
type PostMessageType = {
    id: number
    post: string
}
export type ProfileInitialStateType = {
    postsMessages: Array<PostMessageType>
    newPostText: string
    profile: string
    fetching: boolean
}

type DispatchActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewPostTextAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setFetchingStatusAC>