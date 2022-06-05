import { RootState } from "../../../app/store";
import { AnyObject } from "../../../core/types";

export const selectIsAuth = (state: RootState): boolean =>
  state.autenticacao.status === 'AUTH';

export const selectIsAuthPending = (state: RootState): boolean =>
  state.autenticacao.status === 'PENDING';

export const selectIsRestoringAuth = (state: RootState): boolean =>
  state.autenticacao.status === 'RESTORING';

export const selectHasAuthError = (state: RootState): boolean =>
  state.autenticacao.status === 'ERROR';

export const selectAuthErrorDetails = (
  state: RootState
): unknown | undefined => state.autenticacao.errorDetails;

export const selectAuthMetadata = (
  state: RootState
): AnyObject | undefined => state.autenticacao.payload;
