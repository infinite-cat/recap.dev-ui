import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import 'antd/dist/antd.css'

import { TracesList } from './containers/traces-list.container'
import { getApolloClient } from './config/apollo.config'
import { Trace } from './containers/trace.container'

function App() {
  return (
    <ApolloProvider client={getApolloClient()}>
      <Router>
        <Switch>
          <Route path="/traces/:id">
            <Trace />
          </Route>
          <Route path="/">
            <TracesList />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
