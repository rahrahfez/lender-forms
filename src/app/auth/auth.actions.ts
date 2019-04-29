import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: User) {}
}


export type AuthActions = Login;
