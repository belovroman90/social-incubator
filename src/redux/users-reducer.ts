const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

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
    isFetching: boolean
}
type DispatchActionType =
    ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof toggleIsFetching>

const initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.payload.isFetching}
        default:
            return state
    }
}

export const follow = (id: number) => ({type: FOLLOW, id} as const)
export const unFollow = (id: number) => ({type: UNFOLLOW, id} as const)
export const setUsers = (users: UsersType) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}} as const)
export const setTotalCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, payload: {totalCount}} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}} as const)