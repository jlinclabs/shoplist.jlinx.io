import { useRef, useLayoutEffect } from 'react'
import * as colors from '@mui/material/colors'
import Box from '@mui/material/Box'

import appLogo from 'bundle-text:./AppLogo.svg'

export default function AppLogo({
  size,
  color = colors.green[500],
  ...props
}) {
  return <Box {...{
    ...props,
    dangerouslySetInnerHTML: { __html: appLogo },
    sx: {
      display: 'inline-block',
      width: 100,
      ...props?.sx,
      '--color': color,
      'svg path': {
        fill: 'var(--color)',
      }
    }
  }}/>
}
