import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
