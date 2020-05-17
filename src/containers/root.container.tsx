import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import loadable from '@loadable/component'

import { getApolloClient } from '../config/apollo.config'
import { DrawerLayout, LoadingPage } from '../components'

const getLoadableContainer = (loader: any) =>
  loadable(loader, {
    fallback: <LoadingPage />,
  })

const Trace = getLoadableContainer(() => import('./trace/trace.container'))
const TracesList = getLoadableContainer(() => import('./traces-list.container'))
const Dashboard = getLoadableContainer(() => import('./dashboard.container'))
const Errors = getLoadableContainer(() => import('./errors.container'))
const Error = getLoadableContainer(() => import('./error/error.container'))
const Units = getLoadableContainer(() => import('./units.container'))

function RootContainer() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Router>
        <DrawerLayout>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/units">
              <Units />
            </Route>
            <Route path="/errors/:id">
              <Error />
            </Route>
            <Route path="/errors">
              <Errors />
            </Route>
            <Route path="/traces/:id">
              <Trace />
            </Route>
            <Route path="/traces">
              <TracesList />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </DrawerLayout>
      </Router>
    </ApolloProvider>
  )
}

export default RootContainer
