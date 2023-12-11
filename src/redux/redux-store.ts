import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer"
import {usersReducer} from "./users-reducer";
import {friendsReducer} from "./friends-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    friendsPage: friendsReducer,
    auth: authReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppStateType, any, AnyAction>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))