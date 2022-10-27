import { useRef, useLayoutEffect } from 'react'
import * as colors from '@mui/material/colors'
import Box from '@mui/material/Box'

import appLogo from 'bundle-text:./AppLogo.svg'

const SIZES = {
  small: 20,
  medium: 40,
  large: 100,
  xLarge: 150,
}
export default function AppLogo({
  size = 'medium',
  color = colors.green[500],
  ...props
}) {
  return <Box {...{
    ...props,
    dangerouslySetInnerHTML: { __html: appLogo },
    sx: {
      display: 'inline-block',
      width: SIZES[size],
      ...props?.sx,
      '--color': color,
      'svg path': {
        fill: 'var(--color)',
      }
    }
  }}/>
}
