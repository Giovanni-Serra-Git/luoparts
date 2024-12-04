import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
// import store, { persistor } from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor}  from "./redux/store.js"
import ThemeProvider from "./component/ThemeProvider.jsx"

createRoot(document.getElementById('root')).render(
<PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
)
