import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import Routes from './routes'
import { GlobalStyles } from './globalStyles'
import ErrorBoundary from './ErrorBoundary'

class App extends React.Component<WithTranslation> {
  render() {
    return (
      <>
        <ErrorBoundary>
          <Routes />
          <GlobalStyles />
        </ErrorBoundary>
      </>
    )
  }
}

export default withTranslation('common')(App)
