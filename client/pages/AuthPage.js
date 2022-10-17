import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { isEmail } from 'app-shared/validators'
import { useLogin } from 'app-shared/client/hooks/auth'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import Form from 'app-shared/client/components/Form'
import RedirectPage from 'app-shared/client/pages/RedirectPage'

export default function AuthPage(props) {
  const [search] = useSearchParams()
  if (props.currentUser) return <RedirectPage to={search.get('d') || "/"}/>
  return <AuthForm {...props}/>
}

function AuthForm({ currentUser }) {
  const [email, setEmail] = useState('')

  const login = useLogin('auth.login')
  const submittable = !!(email && isEmail(email))
  const disabled = !!login.pending

  const onSubmit = () => {
    login.call({
      email: email || undefined,
    })
  }
  return <Stack p={2} direction="column" spacing={2} alignItems="center">
    <Paper {...{
      sx: {
        p: 2,
        minWidth: `min(100vw, 500px)`,
      }
    }}>
      <Typography variant="h4" mb={2} align="center">Signup or Login</Typography>
      <Box {...{
        component: Form,
        disabled: !submittable,
        onSubmit,
      }}>
        <ErrorMessage error={login.error}/>
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
      >Login or Signup</Button>
    </Paper>
  </Stack>
}

