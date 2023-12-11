import {Dispatch} from "redux";
import {usersAPI} from "../api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const SET_FOLLOWING_STATUS = 'SET-FOLLOWING-STATUS'

const initialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowing: false,
    followingUsersID: []
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
                users: state.users.map(el => el.id === action.id && el.followed ? {
                    ...el,
                    followed: false
                } : el)
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.page}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.payload.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.payload.isFetching}
        case SET_FOLLOWING_STATUS:
            return {
                ...state, followingUsersID: action.payload.following ?
                    [...state.followingUsersID, action.payload.id] :
                    state.followingUsersID.filter(id => id !== action.payload.id)
            }
        default:
            return state
    }
}

// actions
export const follow = (id: number) => ({type: FOLLOW, id} as const)
export const unFollow = (id: number) => ({type: UNFOLLOW, id} as const)
export const setUsers = (users: UsersType) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (page: number) => ({type: SET_CURRENT_PAGE, payload: {page}} as const)
export const setTotalCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, payload: {totalCount}} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}} as const)
export const setFollowingStatusAC = (id: number, following: boolean) => ({
    type: SET_FOLLOWING_STATUS,
    payload: {id, following}
} as const)

// thunks
export const getUsersTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch<DispatchActionType>) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(response => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(response.items))
        dispatch(setTotalCount(response.totalCount.toString()))
    })
}

export const setCurrentPageTC = (currentPage: number, pageSize: number, pageNumber: number) => (dispatch: Dispatch<DispatchActionType>) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(pageNumber))
    usersAPI.getUsers(currentPage, pageSize).then(response => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(response.items))
    })
}

export const followTC = (id: number) => (dispatch: Dispatch<DispatchActionType>) => {
    dispatch(setFollowingStatusAC(id, true))
    usersAPI.follow(id)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(follow(id))
            }
            dispatch(setFollowingStatusAC(id, false))
        })
        .catch(reason => console.log('Something wrong'))
}

export const unFollowTC = (id: number) => (dispatch: Dispatch<DispatchActionType>) => {
    dispatch(setFollowingStatusAC(id, true))
    usersAPI.unFollow(id)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(unFollow(id))
            }
            dispatch(setFollowingStatusAC(id, false))
        })
        .catch(reason => console.log('Something wrong'))
}

// types
export type UserType = {
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
    isFollowing?: boolean
    followingUsersID: number[]
}
type DispatchActionType =
    ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setFollowingStatusAC>
