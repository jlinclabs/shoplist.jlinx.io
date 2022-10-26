import { createTheme } from '@mui/material/styles'
import darkScrollbar from "@mui/material/darkScrollbar"
import * as colors from '@mui/material/colors'

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // main: colors.green[500],
      main: 'rgb(89, 147, 71)',
    },
    secondary: {
      // main: colors.teal[500],
      // main: colors.teal[500],
      main: 'rgb(54, 75, 27)',
    },
    error: {
      main: 'rgb(144, 7, 0)'
    },
    warning: {
      main: 'rgb(218, 87, 7)'
    },
    info: {
      main: 'rgb(75, 111, 149)'
    },
    success: {
      main: 'rgb(0, 202, 30)',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ ownerState, theme }) => ({
          ...darkScrollbar(),
          backgroundColor: theme.palette.primary.main,
        }),
      }
    }
  }
})

// salad colors
//   rgb(89, 147, 71)
//   rgb(75, 104, 37)
//   rgb(221, 171, 0)
//   rgb(96, 52, 121)
//   rgb(144, 7, 0)
//   rgb(192, 207, 223)
//   rgb(218, 87, 7)