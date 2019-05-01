import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { Login, AuthActionTypes, Logout } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router) {}

    @Effect({ dispatch: false })
    login$ = this.actions$
        .pipe(
            ofType<Login>(AuthActionTypes.LoginAction),
            tap(action => localStorage.setItem('user', JSON.stringify(action.payload)))
        );

    @Effect({ dispatch: false })
    logout$ = this.actions$
        .pipe(
            ofType<Logout>(AuthActionTypes.LogoutAction),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigate(['/login']);
            })
        );
}
