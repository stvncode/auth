import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useLogoutMutation } from './generated/graphql'
import { setAccessToken } from './accessToken'


export const Header: React.FC = () => {
    const {data, loading} = useMeQuery()

    let body: any = null

    if(loading) {
        body = <div>loading...</div>
    } else if (data && data.me) {
        body = <div>You are logged in as {data.me.email}</div>
    } else {
        body = <div>not logged in</div>
    }

    const [logout, {client}] = useLogoutMutation()

    return (
        <header>
            <div>
            <Link to='/'>home</Link>
            </div>
            <div>
            <Link to='/register'>register</Link>
            </div>
            <div>
            <Link to='/login'>login</Link>
            </div>
            <div>
            <Link to='/bye'>bye</Link>
            </div>
            <div>
                {!loading && data && data.me &&
                    <button 
                        onClick={async () => {
                            await logout()
                            setAccessToken('')
                            await client!.resetStore()
                        }}
                    >
                        logout
                    </button>
                }               
            </div>
            {body}
      </header>
        )
}