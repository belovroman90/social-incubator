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
export type UsersInitialStateType = { users: UsersType }

type DispatchActionType = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>

type UsersReducerType = (state: UsersInitialStateType, action: DispatchActionType) => {
    users: UsersType
}

const initialState: UsersInitialStateType = {
    users: [
    //     {
        //     name: 'Roma',
        //     id: 1,
        //     uniqueUrlName: null,
        //     photos: {
        //         small: null,
        //         large: null,
        //     },
        //     status: null,
        //     followed: false
        // }
    ]
}

export const usersReducer: UsersReducerType = (state = initialState, action) => {
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
            // if (state.items.length > 0) return state
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export const followAC = (id: number) => ({type: FOLLOW, id} as const)
export const unFollowAC = (id: number) => ({type: UNFOLLOW, id} as const)
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users} as const)