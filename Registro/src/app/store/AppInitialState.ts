import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isLoggedIn: false,
        isLoggingIn: false,
        user: null
    },
    recuperar: {
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
    }
}