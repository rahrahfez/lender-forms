import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { Login, AuthActionTypes, Logout } from './auth.actions';
import { Router } from '@angular/router';
import { of, defer, Observable } from 'rxjs';

@Injectable()
export class AuthEffects {

    @Effect({ dispatch: false })
    login$ = this.actions$
        .pipe(
            ofType<Login>(AuthActionTypes.LoginAction),
            tap(action =>
                localStorage.setItem('user', JSON.stringify(action.payload)))
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

    @Effect()
    init$ = defer((): Observable<Login | Logout> => {
        const userData = localStorage.getItem('user');

        if (userData) {
            return of(new Login(JSON.parse(userData)));
        } else {
            return of(new Logout());
        }
    });

    constructor(private actions$: Actions, private router: Router) {}
}
