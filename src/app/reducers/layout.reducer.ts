import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tryLogin, tryLogout, tryRestoreAuth } from '../../modulos/autenticacao/thunks/autenticacao.thunk';

export interface LayoutState {
  layout: 'auth' | 'application';
  isSidebarCollapsed: boolean;
}

const layoutSlice = createSlice({
  initialState: {
    layout: 'auth',
    isSidebarCollapsed: false,
  } as LayoutState,
  name: 'layout',
  reducers: {
    updateLayout(state, action: PayloadAction<'auth' | 'application'>) {
      state.layout = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
  extraReducers(builder) {
    builder.addCase(tryLogin.fulfilled, state => {
      state.layout = 'application';
    });

    builder.addCase(tryRestoreAuth.fulfilled, state => {
      state.layout = 'application';
    });

    builder.addCase(tryLogout.fulfilled, state => {
      state.layout = 'auth';
    });
  },
});

export const layoutReducer = layoutSlice.reducer;

export const { updateLayout, toggleSidebar } =
  layoutSlice.actions;
