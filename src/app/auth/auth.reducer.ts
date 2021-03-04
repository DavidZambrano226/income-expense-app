import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actios';
import { User } from '../models/user.model';

export interface State {
    user: User; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(authActions.setUser, ( state, {user} ) => ({ ...state, user:  { ...user } })),
    on(authActions.unSetUser, ( state ) => ({ ...state, user:  null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}