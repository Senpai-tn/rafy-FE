import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import SimpleReactLightbox from 'simple-react-lightbox'
import ThemeContext from './context/ThemeContext'
import Login from './jsx/pages/Login'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SimpleReactLightbox>
        <BrowserRouter>
          <ThemeContext>
            <App />
          </ThemeContext>
        </BrowserRouter>
      </SimpleReactLightbox>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
