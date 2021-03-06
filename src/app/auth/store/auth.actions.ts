import { Action } from '@ngrx/store';

import { User } from '../../models/user.model';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LogoutAction = '[Auth] Logout',
  SignupAction = '[Auth] Signup'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SignupAction;

  constructor(public payload: User) {}
}

export type AuthActions = Login | Logout | Signup;
