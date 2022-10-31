import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'

import { useQuery, useCommand, useCommandOnMount } from 'app-shared/client/hooks/cqrpc.js'
import Form from 'app-shared/client/components/Form'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import InspectObject from 'app-shared/client/components/InspectObject'
import LogoutButton from 'app-shared/client/components/LogoutButton'
// import { useCurrentUser } from 'app-shared/client/hooks/auth'
// import { useCurrentUser } from '../resources/auth'
// import LinkToDid from '../components/LinkToDid'
// import CopyButton from '../components/CopyButton'

export default function ListsPage(props) {
  return <Container maxWidth={"md"}>
    <Routes>
      <Route path="/" element={<Index {...props}/>} />
      <Route path="/new" element={<New {...props}/>} />
      <Route path="/:id" element={<Show {...props}/>} />
    </Routes>
  </Container>
}

function Index({}){
  return <Box>
    Index
  </Box>
}
function New({}){
  const navigate = useNavigate()
  const createCmd = useCommand('lists.create', {
    onSuccess(list){
      navigate(`/lists/${list.id}`)
    },
  })
  const [name, setName] = useState('')
  const submittable = !createCmd.pending && name
  const disabled = createCmd.pending
  const onSubmit = () => {
    createCmd.call({ name })
  }
  return <Paper sx={{p: 2, m:2}}>
    <Box {...{
      component: Form,
      disabled,
      onSubmit,
    }}>
      <Typography variant="h4" mb={2}>Create a new List</Typography>
      <ErrorMessage error={createCmd.error}/>
      <TextField
        autoFocus
        label="name"
        placeholder="xmas 2022"
        disabled={disabled}
        margin="normal"
        fullWidth
        type="text"
        value={name}
        onChange={e => { setName(e.target.value) }}
      />
      <ButtonRow>
        <Button
          type="submit"
          variant="contained"
          disabled={disabled || !submittable}
        >Create List</Button>
      </ButtonRow>
    </Box>
  </Paper>
}
function Show({}){
  return <Box>
    Show
  </Box>
}