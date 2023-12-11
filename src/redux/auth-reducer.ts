import {Dispatch} from "redux";
import {authAPI} from "../api";

const SET_AUTH = 'SET-AUTH'

const initialState: AuthInitialStateType = {
    isAuth: false,
    login: null,
    email: null,
    id: null
}

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-AUTH":
            return {
                ...state,
                isAuth: true,
                login: action.payload.login,
                email: action.payload.email,
                id: action.payload.id
            }
        default:
            return state
    }
}

// actions
const setAuthUserDataAC = (id: number, login: string, email: string) => ({
    type: SET_AUTH,
    payload: {id, login, email}
} as const)

// thunks
export const getAuthUserDataTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(response => {
            if (response.resultCode === 0) {
                let {id, login, email} = response.data
                dispatch(setAuthUserDataAC(id, login, email))
            }
        })
}

// types
export type AuthInitialStateType = {
    isAuth: boolean
    login: string | null
    email: string | null
    id: number | null
}

type ActionsType = ReturnType<typeof setAuthUserDataAC>
