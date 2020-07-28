import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { helloQuery } from './graphql/hello'

export const App: React.FC = () => {
  const {data, loading} = useQuery(helloQuery)

  if(loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      {JSON.stringify(data )}
    </div>
  )
}

