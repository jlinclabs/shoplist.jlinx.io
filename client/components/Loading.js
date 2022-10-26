import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import LogoIcon from './AppLogo.js'

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
      <LogoIcon sx={{
        // perspective: 1000,
        // transform: 'rotateY(180deg)',
        animation: '1s infinite linear flipflop',
        transitionTimingFunction: 'cubic-bezier(.175, .885, .32, 1.275)',
        transformOrigin: '49px 66px',
        '@keyframes flipflop': {
          from: {
            transform: 'rotate(0turn)',
          },
          to: {
            transform: 'rotate(1turn)',
          },
          // '0%': {
          //   '--color': 'red',
          //   transform: 'rotateY(0deg)',
          // },
          // '25%': {
          //   '--color': 'blue',
          //   transform: 'rotateY(0deg)',
          // },
          // '50%': {
          //   '--color': 'lime',
          //   transform: 'rotateY(180deg)',
          // },
          // '75%': {
          //   '--color': 'blue',
          //   transform: 'rotateY(180deg)',
          // },
          // '100%': {
          //   '--color': 'lime',
          //   transform: 'rotateX(0deg) rotateY(0deg)',
          // }
        }
      }}/>
    </Box>
  )
}