import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit"

export interface GenericState<T> {
  data?: T
  status: 'loading' | 'finished' | 'error'
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = '',
  initialState,
  reducers,
}: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = 'loading';
      },
      error(state) {
        state.status = 'error';
      },
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = 'finished';
      },
      ...reducers,
    },
  })
}

const wrappedSlice = createGenericSlice({
  name: 'test',
  initialState: { status: 'loading' } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = 'finished'
      state.data = 'hocus pocus'
    },
  },
})

// interface MyData {
//   // ...
// }

// const fetchUserById = createAsyncThunk(
//   'users/fetchById',
//   // Declare the type your function argument here:
//   async (userId: number) => {
//     const response = await fetch(`https://reqres.in/api/users/${userId}`)
//     // Inferred return type: Promise<MyData>
//     return (await response.json()) as MyData
//   }
// )

// // the parameter of `fetchUserById` is automatically inferred to `number` here
// // and dispatching the resulting thunkAction will return a Promise of a correctly
// // typed "fulfilled" or "rejected" action.
// const lastReturnedAction = await store.dispatch(fetchUserById(3))