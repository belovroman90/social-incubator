const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'
const ADD_POST = 'ADD-POST'

type PostMessageType = {
    id: number
    post: string
}
export type PostsMessagesType = PostMessageType[]
export type ProfileInitialStateType = {
    postsMessages: Array<PostMessageType>
    newPostText: string
}

type DispatchActionType = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewPostTextAC>

export type ProfileReducerType = (state: ProfileInitialStateType, action: DispatchActionType) => {
    postsMessages: PostsMessagesType
    newPostText: string
}

const initialState = {
    postsMessages: [
        {id: 1, post: "How are you?"},
        {id: 2, post: "What are you looking that?"},
        {id: 3, post: "What i am doing?"},
    ],
    newPostText: "",
}

export const profileReducer: ProfileReducerType = (state = initialState, action) => {
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