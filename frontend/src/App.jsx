import React from 'react'
import Login from "./Pages/Login"
import { RouterProvider } from "react-router-dom"
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Edituser from './Pages/Edituser'
import { router } from './Routes/Routes'
import { Provider } from "react-redux"
import {appstore,persistor} from './utils/appstore.js'
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <div>
      <Provider store={appstore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App