import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginFail, loginSuccess } from "./login.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class LoginEffects {
    
    constructor(private actions$: Actions, private authService: AuthService){
        
    }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((payload: {email: string, password: string}) =>
            this.authService.login(payload.email, payload.password).pipe(
                map(user => loginSuccess({user})),
                catchError(error => of(loginFail({error})))
            )
        ) 
    ))
    
}