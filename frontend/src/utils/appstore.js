import {  configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from "./userSlice"



const persistConfig = {
    key: 'root', // The key to store the persisted state
    storage,     // Storage option
  };



  // Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);


const appstore= configureStore(
    {
    reducer:{
      user:persistedReducer
     
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disable the serializable check for redux-persist actions
        }),
})

const persistor = persistStore(appstore);
export {appstore,persistor}