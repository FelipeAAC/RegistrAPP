import { createReducer, on } from "@ngrx/store";
import { RecuperarState } from "./RecuperarState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./recuperar.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: RecuperarState = AppInitialState.recuperar;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true};
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false};
    })
)

export function recuperarReducer(state: RecuperarState, action: any){
    return reducer(state, action)
}