import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core';
import React from 'react'

function LogoutButton() {
    const {logout} = useAuth0();
    return (
    <>
        <Button onClick={() => logout()}>Logout</Button>
    </>
  )
}

export default LogoutButton