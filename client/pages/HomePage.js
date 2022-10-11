import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import InspectObject from 'app-shared/client/components/InspectObject'
import LogoutButton from 'app-shared/client/components/LogoutButton'
import Link from 'app-shared/client/components/Link'
import ButtonRow from 'app-shared/client/components/ButtonRow'

export default function HomePage({ currentUser }) {
  return <Box p={2}>
    <Paper sx={{p:2}}>
      <Typography variant="h3">SHOP LIST!</Typography>
      <InspectObject object={{ currentUser }}/>
      <ButtonRow>
        <Link to="/lists">Lists!</Link>
        <LogoutButton variant="text"/>
      </ButtonRow>
    </Paper>
  </Box>
}

