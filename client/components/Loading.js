import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import LogoIcon from './LogoIcon.js'

export default function FullPageLoading(props){
  if (props.variant === 'fullPage') return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/*<CircularProgress size={140}/>*/}
      <LogoIcon/>
    </Box>
  )
}