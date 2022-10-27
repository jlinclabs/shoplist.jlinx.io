import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import MenuIcon from '@mui/icons-material/Menu';

import { useLogout } from 'app-shared/client/hooks/auth'
import Link from 'app-shared/client/components/Link'
import InspectObject from 'app-shared/client/components/InspectObject'
import AppLogo from './AppLogo'


export default function TopNav({ currentUser }){
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppLogo
            size="medium"
            mr={1}
            component={Link}
            to="/"
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              display: 'flex',
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shop List!
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavButton to="/about"  value="About"/>
            {currentUser
              ? <>
                <NavButton to="/lists" value="My Lists"/>
                <NavButton to="/lists/new" value={<PlaylistAddIcon/>}/>
              </>
              : <>
              </>
            }
          </Box>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 0 }}>
            {currentUser
              ? <LoggedIn {...{ currentUser }}/>
              : <LoggedOut />
            }
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function NavButton({ value, to }) {
  return <Button
    component={Link}
    to={to}
    sx={{
      my: 2,
      color: 'white',
    }}
  >{value}</Button>
}


function LoggedIn({ currentUser }){
  const _logout = useLogout()
  const logout = () => { _logout.call() }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return <>
    <Box>{currentUser.email}</Box>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <MenuIcon/>
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <MenuItem
        component={Link}
        to="/settings"
        onClick={handleCloseUserMenu}
      >
        <Typography textAlign="center">Settings</Typography>
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={() => { logout(); handleCloseUserMenu() }}
      >
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>
  </>
}

function LoggedOut(){

}

