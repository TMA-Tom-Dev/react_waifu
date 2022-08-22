import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import React from 'react'

function LoginButton() {
    const {loginWithRedirect} = useAuth0();
  return (
    <>
        <Button type='button' color='info' onClick={() => loginWithRedirect()}>
            Login
        </Button>
    </>
  )
}

export default LoginButton