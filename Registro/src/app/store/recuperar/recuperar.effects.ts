import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "../recuperar/recuperar.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class RecuperarEffects {
    
    constructor(private actions$: Actions, private authService: AuthService){

    }

    recoverPassword$ = createEffect(() => this.actions$.pipe(
        ofType(recoverPassword),
        switchMap((payload: {email: string}) => this.authService.recoverEmailPassword(payload.email).pipe(
            map(() => recoverPasswordSuccess()),
            catchError(error => of(recoverPasswordFail({error})))
        ))

    ))
}