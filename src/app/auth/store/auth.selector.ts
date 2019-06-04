import { createSelector, State } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const selectAuthState = (state: any) => state.auth;

export const isLoggedIn = createSelector(selectAuthState, auth => auth.loggedIn);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

// export const userUid = createSelector(selectAuthState, user => user.user.uid);
export const userDisplayName = createSelector(selectAuthState, user => user.user.displayName);
