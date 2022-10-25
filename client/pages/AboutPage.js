import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import AppLogo from '../components/LogoIcon.js'

export default function AboutPage(props) {
  return <Stack p={2} direction="column" spacing={2} alignItems="center">
    <Paper sx={{p:2, minWidth: '50vw', maxWidth: '600px'}}>
      <Typography variant="h4" align="center" >
        <AppLogo/>
        Shop List
      </Typography>
      {[
        `…is a demo of the JLINX personal database by Jlinc Labs.`,
        `TBD…`,
      ].map((text, i) => <p key={i}>{text}</p>)}
    </Paper>
  </Stack>
}
