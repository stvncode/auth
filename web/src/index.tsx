import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {Routes} from './Routes'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})
ReactDOM.render(
  <ApolloProvider client={client as any}>
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)