const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null
        large: null
    }
    status: null
    followed: boolean
}
export type UsersType = UserType[]
export type UsersInitialStateType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
}
type DispatchActionType = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>

const initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 10,
}

export const usersReducer = (state = initialState, action: DispatchActionType): UsersInitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.id && !el.followed ? {...el, followed: true} : el)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(el => el.id === action.id && el.followed ? {...el, followed: false} : el)
            }
        case SET_USERS:
            if (state.users.length > 0) return state
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export const followAC = (id: number) => ({type: FOLLOW, id} as const)
export const unFollowAC = (id: number) => ({type: UNFOLLOW, id} as const)
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users} as const)