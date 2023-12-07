import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { AppInitialState } from "../AppInitialState";
import { login, loginFail, loginSuccess } from "./login.actions";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        }
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            isLoggedIn: true,
            isLoggingIn: false
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })
)

export function loginReducer(state: LoginState, action: any){
    return reducer(state, action)
}