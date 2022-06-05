import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenericState } from './generic';

const counterSlice = createSlice({
  initialState: { status: 'loading' } as GenericState<number>,
  name: 'counter',
  reducers: {
    start(state)  {
        state.status = 'loading';
    },
    error(state) {
        state.status = 'error';
        state.data = 0;
    },
    success(state: GenericState<number>, action: PayloadAction<number>) {
        state.data = action.payload;
        state.status = 'finished';
    },
    // magic(state) {
    //     state.status = 'finished'
    //     state.data = 
    // },
  },
});

export const counterReducer = counterSlice.reducer;
