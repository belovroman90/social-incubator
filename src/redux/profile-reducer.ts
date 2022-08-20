const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'
const SET_USERS_PROFILE = 'SET-USERS-PROFILE'

type PostMessageType = {
    id: number
    post: string
}
export type PostsMessagesType = PostMessageType[]
export type ProfileInitialStateType = {
    postsMessages: Array<PostMessageType>
    newPostText: string
    profile: string
}

type DispatchActionType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewPostTextAC>
    | ReturnType<typeof setUserProfile>

const initialState: ProfileInitialStateType = {
    postsMessages: [
        {id: 1, post: "How are you?"},
        {id: 2, post: "What are you looking that?"},
        {id: 3, post: "What i am doing?"},
    ],
    newPostText: "",
    profile: '',
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
        default:
            return state
    }
}

export const changeNewPostTextAC = (newPostText: string) => ({
    type: CHANGE_NEW_POST_TEXT,
    newPostText: newPostText,
} as const)
export const addPostAC = () => ({
    type: ADD_POST,
} as const)
export const setUserProfile = (profile: string) => ({type: SET_USERS_PROFILE, payload: profile} as const)