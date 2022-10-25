import { createTheme } from '@mui/material/styles'
import darkScrollbar from "@mui/material/darkScrollbar"
import * as colors from '@mui/material/colors'

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.green[500],
    },
    secondary: {
      main: colors.teal[500],
    },
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
