import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import InspectObject from 'app-shared/client/components/InspectObject'
// import { useCurrentAgent } from '../resources/auth'
// import LinkToDid from '../components/LinkToDid'
// import CopyButton from '../components/CopyButton'

export default function HomePage() {
  // const { currentAgent } = useCurrentAgent()
  return <Box p={2}>
    <Paper sx={{p:2}}>
      <Typography variant="h3">Net Rep LIVE!</Typography>
      <Typography variant="h5">now for the server api proxy!</Typography>
      <InspectObject object={{hello: 'world 22'}}/>
    </Paper>
  </Box>
}

