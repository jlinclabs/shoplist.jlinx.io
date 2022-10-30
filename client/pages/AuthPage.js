import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { isEmail } from 'app-shared/shared/emails'
import { useQuery, useCommand, useCommandOnMount } from 'app-shared/client/hooks/cqrpc.js'
import InspectObject from 'app-shared/client/components/InspectObject'
import { useLogin } from 'app-shared/client/hooks/auth'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Form from 'app-shared/client/components/Form'
import RedirectPage from 'app-shared/client/pages/RedirectPage'
import {Circle} from "@mui/icons-material";

// import { isAgentEmail } from '../../../shared/agents.js'


export default function AuthPage({...props}) {
  const [search] = useSearchParams()
  if (props.currentUser) return <RedirectPage to={search.get('d') || "/"}/>
  return <AuthForm {...props}/>
}

const isJlinxAgentEmail = email =>
  /^[a-zA-Z0-9_-]{32,64}@.+/.test(email)
  // /[a-zA-Z0-9-_/=+]{64}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)


function AuthForm({ currentUser }) {
  const [email, setEmail] = useState('')
  const [loginViaAgent, setLoginViaAgent] = useState(false)

  const login = useLogin('auth.login')
  const disabled = !!login.pending

  const emailIsJlinxAgent = isJlinxAgentEmail(email)

  return <Stack p={2} direction="column" alignItems="center">
    <Paper sx={{
      p: 2,
      minWidth: `min(100vw, 500px)`,
      maxWidth: `calc(100vw - 20px)`,
    }}>
      {loginViaAgent
        ? <LoginViaAgent {...{disabled, email}}/>
        : <EmailForm {...{
          disabled, email, setEmail, emailIsJlinxAgent,
          pending: login.pending,
          error: login.error,
          onSubmit() {
            if (emailIsJlinxAgent) setLoginViaAgent(true)
            else login.call({email: email || undefined})
          }
        }}/>
      }
    </Paper>
  </Stack>
}


function EmailForm({ disabled, email, setEmail, emailIsJlinxAgent, onSubmit, pending, error }){
  const submittable = !!(email && isEmail(email))
  return <Form {...{
    onSubmit,
    disabled: disabled || !submittable,
  }}>
    <Typography variant="h4" mb={2} align="center">Signup or Login</Typography>
    <Box>
      <ErrorMessage error={error}/>
      <TextField
        autoFocus
        label="email"
        autoComplete="email"
        disabled={disabled}
        margin="normal"
        fullWidth
        name="email"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value) }}
      />
    </Box>
    <Button
      disabled={disabled || !submittable}
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      sx={{
        backgroundColor: (
          emailIsJlinxAgent
            ? 'rgb(33, 118, 130)' //️'info.dark'
            : 'success.main'
        ),
      }}
    >{
      pending
        ? 'WORKING ON IT…'
        : (emailIsJlinxAgent
          ? 'LOGIN WITH YOU JLINC AGENT 🕵'
          : 'EMAIL ME A LOGIN LINK'
        )
    }</Button>
  </Form>
}


function LoginViaAgent({ disabled, email }) {
  const host = email.split('@')[1]
  const loginRequest = useCommandOnMount(`auth.requestLogin`, { email }, {
    onSuccess(...args){
      console.log('auth.requestLogin onSuccess', args)
    },
    onFailure(...args){
      console.log('auth.requestLogin onFailure', args)
    },
    onComplete(...args){
      console.log('auth.requestLogin onComplete', args)
    },
  })

  const waitForResult = useCommandOnMount(`auth.waitForLoginRequestResult`, {
    onSuccess(...args){
      console.log('auth.waitForResult onSuccess', args)
    },
    onFailure(...args){
      console.log('auth.waitForResult onFailure', args)
    },
    onComplete(...args){
      console.log('auth.waitForResult onComplete', args)
    },
  })

  console.log({ loginRequest, waitForResult })

  useEffect(
    () => {
      if (loginRequest.resolved){
        console.log(loginRequest.result)
        const id = loginRequest.result.loginAttemptId
        waitForResult.call({ id })
      }
    },
    [loginRequest.resolved]
  )
  return <Form {...{
    // onSubmit,
    disabled,
  }}>
    <Typography variant="h4" mb={2} align="center">Login via JLINX Agent 🕵</Typography>
    <ErrorMessage error={loginRequest.error}/>
    {loginRequest.pending &&
      <Box align="center">
        <Typography variant="h6" mb={2}>Contacting your agent at {host}</Typography>
        <CircularProgress />
      </Box>
    }
    {loginRequest.resolved &&
      <Box align="center">
        <Typography variant="h6" mb={2}>Go checking your agent!</Typography>
        <Typography variant="h6" mb={2}>We've sent a login request to your agent at {host}</Typography>
        <CircularProgress />
      </Box>
    }
    {loginRequest.resolved && <InspectObject object={loginRequest.result}/>}
  </Form>
}
