import React from 'react'
import { RouterProvider } from "react-router-dom"
import { router } from './Routes/Routes'
import { Provider } from "react-redux"
import {appstore,persistor} from './utils/appstore.js'
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Provider store={appstore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
      <ToastContainer/>
    </div>
  )
}

export default App