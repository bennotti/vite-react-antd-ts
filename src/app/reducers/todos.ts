import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenericState } from './generic';

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

export interface MyData {
  data: Data;
  support: Support;
}

const getById = createAsyncThunk(
  'todos/get-by-id',
  // Declare the type your function argument here:
  async (userId: number, { rejectWithValue }): Promise<MyData | undefined> => {
    try{
      const response = await fetch(`https://reqres.in/api/users/${userId}`)
      // Inferred return type: Promise<MyData>
      return (await response.json()) as MyData;
    } catch (ex) {
      rejectWithValue({});
    }
  }
);

// const todoSlice = createGenericSlice({
//     name: 'todos',
//     initialState: { status: 'loading' } as GenericState<string>,
//     reducers: {
//         magic(state) {
//             state.status = 'finished'
//             state.data = 'hocus pocus'
//         },
//     }
// });

const todoSlice = createSlice({
  initialState: { status: 'loading' } as GenericState<MyData>,
  name: 'todos',
  reducers: {
    start(state) {
        state.status = 'loading';
    },
    error(state) {
        state.status = 'error';
    },
    success(state: GenericState<MyData>, action: PayloadAction<MyData>) {
        state.data = action.payload;
        state.status = 'finished';
    },
    // magic(state) {
    //     state.status = 'finished'
    //     state.data = 
    // },
  },
  extraReducers(builder) {
    builder.addCase(getById.pending, (state, action) => {
      state.status = 'loading';
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    })
    builder.addCase(
      getById.fulfilled,
      (state, payload: PayloadAction<MyData | undefined>) => {
        console.log(payload);
        // if (isSerializedApiError(payload)) {
        //   state.status = 'ERROR';
        //   state.errorDetails = payload;
        //   state.token = undefined;
        //   state.payload = undefined;
        //   return;
        // }
        // state.status = 'AUTH';
        // state.token = (payload as IPayloadAuth).access_token;
        // state.payload = (payload as IPayloadAuth).payload;
        state.status = 'finished';
      }
    );

    builder.addCase(getById.rejected, (state, { payload }) => {
      state.status = 'error';
    });
  },
});

export const todoReducer = todoSlice.reducer;
