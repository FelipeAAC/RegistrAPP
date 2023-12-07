import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";
import { RecuperarState } from "./recuperar/RecuperarState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    recuperar: RecuperarState;
}