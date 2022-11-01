import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import AppLogo from './AppLogo.js'

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
      <AppLogo size="xLarge" sx={{
        position: 'relative',
        animation: '1s infinite linear flipflop',
        transitionTimingFunction: 'cubic-bezier(.175, .885, .32, 1.275)',
        transformOrigin: '74px 98px',
        // ':before': {
        //   position: 'absolute',
        //   top: '98px',
        //   left: '74px',
        //   content: '" "',
        //   border: '1px solid red',
        //   height: '1px',
        //   width: '1px',
        // },
        '@keyframes flipflop': {
          from: {
            transform: 'rotate(0turn)',
          },
          to: {
            transform: 'rotate(1turn)',
          },
        }
      }}/>
    </Box>
  )
}