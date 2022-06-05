import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { autenticacaoReducer } from '../modulos/autenticacao/reducers/autenticacao.reducer';
import { counterReducer } from './reducers/counter';
import { layoutReducer } from './reducers/layout.reducer';
import { todoReducer } from './reducers/todos';


export const rootReducer = combineReducers({
  todos: todoReducer,
  counter: counterReducer,
  layout: layoutReducer,
  autenticacao: autenticacaoReducer,
});

export function createApplicationStore() {
  return configureStore({
    devTools: { name: 'poc-vite-react-antd-ts' },
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware()
    //   .prepend(
    //     // correctly typed middlewares can just be used
    //     additionalMiddleware,
    //     // you can also type middlewares manually
    //     untypedMiddleware as Middleware<
    //       (action: Action<'specialAction'>) => number,
    //       RootState
    //     >
    //   )
    //   // prepend and concat calls can be chained
    //   .concat(logger),
  });
}

const store = createApplicationStore();

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
