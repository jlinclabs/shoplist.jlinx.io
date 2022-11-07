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
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useQuery, useCommand, useCommandOnMount } from 'app-shared/client/hooks/cqrpc.js'
import Form from 'app-shared/client/components/Form'
import ErrorMessage from 'app-shared/client/components/ErrorMessage'
import ButtonRow from 'app-shared/client/components/ButtonRow'
import Timestamp from 'app-shared/client/components/Timestamp'
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
  const { id } = useParams()
  const query = useQuery('lists.getById', { id })
  return <Paper sx={{p: 2, m:2}}>
    <ErrorMessage error={query.error}/>
    {query.pending && <CircularProgress/>}
    {query.result && <List {...query.result} key={id}/>}
  </Paper>
}

function List({ id, name, createdAt, updatedAt, value }) {
  const [newValue, setNewValue] = useState({...value})
  const update = useCommand('lists.update')
  const items = newValue.items || []
  console.log({ items })
  const disabled = update.pending

  const onReset = () => {
    const confirmed = confirm(`are you sure?`)
    if (!confirmed) return
    setNewValue({...value})
  }
  let paddedLength = items.length + 2

  return <Box {...{
    component: Form,
    onSubmit() {
      update.call({ id, value: newValue })
    },
  }}>
    <Typography variant="h4">{name}</Typography>
    <Typography variant="body2">
      Created: <Timestamp at={createdAt}/>
    </Typography>
    {updatedAt &&
      <Typography variant="body2">
        Updated: <Timestamp at={createdAt}/>
      </Typography>
    }
    <ErrorMessage error={update.error}/>
    <Stack spacing={2} my={2}>
      {Array(paddedLength).fill().map((_, index) =>
        <ListItem {...{
          key: index,
          index,
          isExtra: index >= items.length,
          value: items[index],
          onChange(newItemValue){
            const newItems = [...items]
            newItems[index] = newItemValue
            setNewValue({...newValue, items: newItems})
          },
          onDelete(){
            const confirmed = confirm(`are you sure?`)
            if (!confirmed) return
            const newItems = [...items]
            newItems.splice(index, 1)
            setNewValue({...newValue, items: newItems})
          }
        }} />
      )}
    </Stack>

    <ButtonRow>
      <Button
        type="submit"
        variant="contained"
        disabled={disabled}
      >Save List</Button>
      <Button
        variant="text"
        disabled={disabled}
        onClick={onReset}
      >reset</Button>
    </ButtonRow>
  </Box>
}

function ListItem({ index, isExtra, disabled, value, onChange, onDelete }){
  return <Stack direction="row" alignItems="center" spacing={2}>
    <Typography variant="body2">{index + 1}</Typography>
    <TextField
      size="small"
      margin="dense"
      disabled={disabled}
      fullWidth
      type="text"
      value={value || ''}
      onChange={e => { onChange(e.target.value) }}
    />
    <IconButton
      onClick={onDelete}
      tabIndex={-1}
      disabled={isExtra && (typeof value !== 'string' || value === '')}
    >
      <DeleteForeverIcon/>
    </IconButton>
  </Stack>
}