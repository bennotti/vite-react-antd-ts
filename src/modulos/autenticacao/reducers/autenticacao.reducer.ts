import { createSlice } from '@reduxjs/toolkit';
import { AnyObject } from '../../../core/types';
import { tryLogin, tryLogout, tryRestoreAuth } from '../thunks/autenticacao.thunk';

export type AuthStatus = 'GUEST' | 'AUTH' | 'PENDING' | 'ERROR' | 'RESTORING';

export type AuthState = {
  status: AuthStatus;
  token?: string;
  payload?: AnyObject;
  errorDetails?: unknown;
  access_token?: string;
};

const initialState: AuthState = {
  status: 'RESTORING',
};

const autenticacaoSlice = createSlice({
  initialState,
  name: 'Autenticacao',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(tryLogin.pending, state => {
      state.status = 'PENDING';
    });

    builder.addCase(
      tryLogin.fulfilled,
      (state, { payload }) => {
        console.log('fulfilled', payload);
        state.status = 'AUTH';
        state.token = (payload as AnyObject).accessToken;
        state.payload = (payload as AnyObject).payload;
      }
    );

    builder.addCase(tryLogin.rejected, (state, { payload }) => {
      console.log('rejected', payload);
      state.status = 'ERROR';
    });

    builder.addCase(tryLogout.pending, state => {
      state.status = 'RESTORING';
    });

    builder.addCase(tryRestoreAuth.pending, state => {
      state.status = 'RESTORING';
    });

    builder.addCase(tryRestoreAuth.fulfilled, (state, { payload }) => {
      state.status = 'AUTH';
      state.token = (payload as AnyObject).accessToken;
      state.payload = (payload as AnyObject).payload;
    });

    builder.addCase(tryRestoreAuth.rejected, state => {
      state.status = 'GUEST';
    });

    builder.addCase(tryLogout.fulfilled, state => {
      state.status = 'GUEST';
      state.token = undefined;
      state.payload = undefined;
    });
  },
});

export const autenticacaoReducer = autenticacaoSlice.reducer;
