// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  userReducer from './user/userSlice'
import homeReducer from './home/homeSlice'
import commReducer from './communications/commSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from'redux-persist/lib/storage'
import resetNewMessageTransform from "./communications/commTransform";
const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
  comm: commReducer
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [resetNewMessageTransform],
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)
