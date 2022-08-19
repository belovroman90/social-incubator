const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'

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
    currentPage: number
}
type DispatchActionType =
    ReturnType<typeof followAC>
    | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>

const initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
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
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.payload.totalCount}
        default:
            return state
    }
}

export const followAC = (id: number) => ({type: FOLLOW, id} as const)
export const unFollowAC = (id: number) => ({type: UNFOLLOW, id} as const)
export const setUsersAC = (users: UsersType) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}} as const)
export const setTotalCountAC = (totalCount: number) => ({type: SET_TOTAL_COUNT, payload: {totalCount}} as const)