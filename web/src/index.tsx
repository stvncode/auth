import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import {App} from './App'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
ReactDOM.render(
  <ApolloProvider client={client as any}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)