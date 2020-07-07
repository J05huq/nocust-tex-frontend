import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'

import Header from './components/Header'
import Dashboard from './components/Dashboard'

export default class RouteComponent extends React.Component {
  render() {
    const storedRoute = localStorage.getItem('current_pair') || 'fLQD-fETH'
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <ToastContainer position="bottom-right" autoClose={2000} />

          <Header />

          <Switch>
            <Route path={'/exchange/trade/:token'} component={Dashboard} />
            <Redirect from={'/exchange'} to={`/exchange/trade/${storedRoute}`} />
            <Redirect from={'/'} to={`/exchange/trade/${storedRoute}`} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
