import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Api } from './services/api'
import { authReducer } from './services/auth'

const rootReducer = combineReducers({
  [Api.reducerPath]: Api.reducer,
  auth: authReducer
});
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
})

setupListeners(store.dispatch)