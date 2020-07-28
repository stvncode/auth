import React from 'react'
import { useHelloQuery } from './generated/graphql'

export const App: React.FC = () => {
  const {data, loading} = useHelloQuery()

  if(loading || !data) {
    return <div>loading...</div>
  }
  return (
    <div>
      {data.hello}
    </div>
  )
}

