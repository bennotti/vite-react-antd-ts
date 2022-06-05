import { createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageHelper } from '../../../core/helper/local-storage-helper';
import { ICredencialDto } from '../dtos/credencial.dto';

export const tryLogin = createAsyncThunk(
  'auth/tryLogin',
  async (credencial: ICredencialDto, { rejectWithValue }) => {
    try {
      if (credencial.usuario === 'error') {
        throw new Error('foi com error');
      }
      LocalStorageHelper.saveObject(credencial, 'userAutenticado');
      return {
          accessToken: '123',
          payload: credencial
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const tryLogout = createAsyncThunk('auth/tryLogout', () => {
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
