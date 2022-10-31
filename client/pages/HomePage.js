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

import AppLogo from '../components/AppLogo.js'
import MyLists from '../components/MyLists.js'

export default function HomePage(props) {
  return h(props.currentUser ? LoggedIn : LoggedOut, props)
}

function LoggedOut(){
  return <Stack p={2} direction="column" spacing={2} alignItems="center">
    <Paper sx={{p:2, minWidth: '50vw', maxWidth: '600px'}}>
      <Typography variant="h4" align="center">
        Welcome to
        <div><AppLogo sx={{m2: 2}}/></div>
        Shop List!
      </Typography>
      {[
        `Shop List is a demo app that lets you manage one or more shopping list.`,
        `Shop List helps demonstrate how apps can use data owned by the user by ` +
        `storing all of your data in your personal JLINX Agent Database.`,
      ].map((text, i) => <p key={i}>{text}</p>)}
    </Paper>
    <Box>
      <Button
        variant="contained"
        component={Link}
        to="/auth"
      >Signup and own your data</Button>
    </Box>
  </Stack>
}

function LoggedIn({ currentUser }){
  return <Container maxWidth="sm">
    <Paper sx={{p: 2, m: 2}}>
      <Typography variant="h4">Welcome {currentUser.displayName}</Typography>
    </Paper>
    <Paper sx={{p: 2, m: 2}}>
      <Typography variant="h5">Your Lists:</Typography>
      <MyLists/>
    </Paper>
  </Container>
}


//   return <Box p={2}>
//     <Paper sx={{p:2}}>
//       <Typography variant="h3">SHOP LIST!</Typography>
//       <InspectObject object={{ currentUser }}/>
//       <ButtonRow>
//         <Link to="/lists">Lists!</Link>
//         <LogoutButton variant="text"/>
//       </ButtonRow>
//     </Paper>
//   </Box>
// }
//
