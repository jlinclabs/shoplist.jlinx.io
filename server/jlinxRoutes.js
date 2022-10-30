import Debug from 'debug'
import Router from 'express-promise-router'
import jlinxApp from './jlinxApp.js'

const debug = Debug('jlinxApp.api')
const router = Router()
export default router

// router.get('/id', (req, res) => {
//   res.json({
//     id: jlinxApp.id,
//     did: jlinxApp.did,
//   })
// })

router.use((req, res, next) => {
  res.status(404).json({})
})

// TODO dry up this dup error handling into app-shared
router.use(async (error, req, res, next) => {
  res.status(500)
  res.json({
    error: {
      message: error?.message ?? error,
      stack: error?.stack,
    }
  })
})