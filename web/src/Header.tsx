import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useLogoutMutation } from './generated/graphql'
import { setAccessToken } from './accessToken'
import { Button } from './components/button/Button'
import { Spin } from './components/spin/Spin'
import { css } from './app.styles'

export const Header: React.FC = () => {
    const {data, loading} = useMeQuery()

    let body: any = null

    if(loading) {
        body = <div><Spin /></div>
    } else if (data && data.me) {
        body = <div>You are logged in as {data.me.email}</div>
    } else {
        body = <div>not logged in</div>
    }

    const [logout, {client}] = useLogoutMutation()

    return (
        <>
        <div className={css.header}>
            <div>
            <Link className={css.link} to='/'>home</Link>
            </div>
            <div>
            <Link className={css.link} to='/register'>register</Link>
            </div>
            <div >
            <Link className={css.link} to='/login'>login</Link>
            </div>
            <div>
            <Link className={css.link} to='/bye'>bye</Link>
            </div>
      </div>
      {body}
      <div>
      {!loading && data && data.me &&
          <Button 
              onClick={async () => {
                  await logout()
                  setAccessToken('')
                  await client!.resetStore()
              }}
          >
              logout
          </Button>
      }               
  </div>
  </>
        )
}