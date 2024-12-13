// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import gameReducer from "./gameslice";

const rootReducer = combineReducers({
  auth: authReducer, 
  theme: themeReducer, 
  allusers: userReducer, 
  game: gameReducer, 
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
