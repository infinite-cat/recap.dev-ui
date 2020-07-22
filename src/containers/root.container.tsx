import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import loadable from '@loadable/component'

import { getApolloClient } from '../config/apollo.config'
import { DrawerLayout, LoadingPage } from '../components'

const getLoadableContainer = (loader: any) =>
  loadable(loader, {
    fallback: <LoadingPage height="100vh" />,
  })

const Trace = getLoadableContainer(() => import('./trace/trace.container'))
const TracesList = getLoadableContainer(() => import('./traces.container'))
const Dashboard = getLoadableContainer(() => import('./dashboard.container'))
const Errors = getLoadableContainer(() => import('./errors.container'))
const Error = getLoadableContainer(() => import('./error/error.container'))
const Unit = getLoadableContainer(() => import('./unit/unit.container'))
const Units = getLoadableContainer(() => import('./units.container'))
const Settings = getLoadableContainer(() => import('./settings/settings.container'))

function RootContainer() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Router>
        <DrawerLayout>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/units/:unitName">
              <Unit />
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
            <Route path="/settings">
              <Settings />
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
