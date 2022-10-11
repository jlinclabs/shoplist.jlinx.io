import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import InspectObject from 'app-shared/client/components/InspectObject'
import LogoutButton from 'app-shared/client/components/LogoutButton'
// import { useCurrentUser } from 'app-shared/client/hooks/auth'
// import { useCurrentUser } from '../resources/auth'
// import LinkToDid from '../components/LinkToDid'
// import CopyButton from '../components/CopyButton'

export default function ListsPage({ currentUser }) {
  return <Box p={2}>
    <Paper sx={{p:2}}>
      <Typography variant="h3">Lists!</Typography>
      <Typography variant="h5">make as many as you want</Typography>
    </Paper>
  </Box>
}

