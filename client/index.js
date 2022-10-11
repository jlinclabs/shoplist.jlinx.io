import { render } from 'app-shared/client/render.js'
import Routes from './Routes'
import theme from './theme'

render({
  // TODO: this because env not usable in shared componencts
  APP_NAME: process.env.APP_NAME,


  Routes,
  theme,
})
