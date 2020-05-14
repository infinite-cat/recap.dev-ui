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

function RootContainer() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Router>
        <DrawerLayout>
          <Switch>
            <Route path="/traces/:id">
              <Trace />
            </Route>
            <Route path="/">
              <TracesList />
            </Route>
          </Switch>
        </DrawerLayout>
      </Router>
    </ApolloProvider>
  )
}

export default RootContainer
