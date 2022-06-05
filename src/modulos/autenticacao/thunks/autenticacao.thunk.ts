import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataResponseApiDto } from '../../../core/dtos/data-response-api.dto';
import { LocalStorageHelper } from '../../../core/helper/local-storage-helper';
import { createAutenticacaoApi } from '../api/autenticacao.api';
import { IAutenticacaoCredencialLoginRequestDto } from '../dtos/autenticacao-credencial-login-request.dto';
import { IAutenticacaoCredencialLoginResponseDto } from '../dtos/autenticacao-credencial-login-response.dto';

const autenticacaoApi = createAutenticacaoApi();

export const tryLogin = createAsyncThunk(
  'auth/tryLogin',
  async (credencial: IAutenticacaoCredencialLoginRequestDto, { fulfillWithValue, rejectWithValue }) => {
    try {
      if (credencial.usuario === 'error') {
        throw new Error('foi com error');
      }
      const dataResponseApi = await autenticacaoApi.login(credencial) as IDataResponseApiDto<IAutenticacaoCredencialLoginResponseDto>;
      if (!dataResponseApi || (dataResponseApi && !dataResponseApi.result)){
        return rejectWithValue(!dataResponseApi ? {} : dataResponseApi);
      }
      const response = dataResponseApi.data as IAutenticacaoCredencialLoginResponseDto;
      LocalStorageHelper.saveObject(response, 'userAutenticado');
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const tryLogout = createAsyncThunk('auth/tryLogout', async () => {
  await autenticacaoApi.logout();
  LocalStorageHelper.clear();
});
export const tryRestoreAuth = createAsyncThunk(
  'auth/tryRestoreAuth',
  () => {
    const credencial = LocalStorageHelper.getFromJson('userAutenticado');
    if (!credencial) {
      console.log('Invalid token');
      throw new Error('Invalid token');
    }
    return {
      accessToken: '123',
      payload: credencial
    };
  }
);
