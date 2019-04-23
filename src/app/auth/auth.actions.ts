import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  
  
}

export class Auths implements Action {
  readonly type = AuthActionTypes.LoginAction;
}


export type AuthActions = Auths;
