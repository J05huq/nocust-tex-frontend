import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import store from './state/store'
import { initI18n } from './services/i18n'
// TODO Get rif of SCSS styles at all => move them to styled-components
import './styles/index.scss'
import * as Sentry from '@sentry/browser'

// TODO Move i18n initialization to the point where we know default language
initI18n('en')
Sentry.init({
  dsn: `https://${process.env.REACT_APP_SENTRY_KEY}@sentry.io/${process.env.REACT_APP_SENTRY_APP}`,
})

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
