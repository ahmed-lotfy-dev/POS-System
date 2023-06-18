import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"

import { Provider } from "react-redux"
import { store } from "./store/store.js"
import {
  BrowserRouter,
  
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
