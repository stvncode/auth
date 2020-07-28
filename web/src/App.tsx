import React from 'react'
import { useQuery, gql } from '@apollo/react-hooks'

export const App: React.FC = () => {
  const {} = useQuery(gql``)
  return (
    <div>
      hello
    </div>
  )
}

