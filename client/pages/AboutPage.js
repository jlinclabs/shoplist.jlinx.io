import { createElement as h } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import Link from 'app-shared/client/components/Link'
import InspectObject from 'app-shared/client/components/InspectObject'
import LogoutButton from 'app-shared/client/components/LogoutButton'
import ButtonRow from 'app-shared/client/components/ButtonRow'

export default function AboutPage(props) {
  return <Stack p={2} direction="column" spacing={2} alignItems="center">
    <Paper sx={{p:2, minWidth: '50vw', maxWidth: '600px'}}>
      <Typography variant="h4" align="center">Shop List</Typography>
      {[
        `…is a demo of the JLINX personal database by Jlinc Labs.`,
        `TBD…`,
      ].map((text, i) => <p key={i}>{text}</p>)}
    </Paper>
  </Stack>
}
