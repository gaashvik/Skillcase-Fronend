import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist the 'auth' slice
  version: 1,
};

// Combine reducers (even if single slice)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
