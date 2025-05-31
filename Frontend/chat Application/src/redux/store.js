import {configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageslice.js"
import socketReducer from "./Socketslice.js"
import { combineReducers } from "redux"; 
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'message'], // Persist messages across refresh
  blacklist: ['socket'],
}
 const rootReducer=combineReducers(
 {
        user:userReducer,
        message:messageReducer,
        socket:socketReducer
    }
 )
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store=configureStore({
    reducer:persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['socket.socket'], 
      },
    }),
});
export default store;