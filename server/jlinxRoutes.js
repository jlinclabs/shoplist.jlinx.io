import Debug from 'debug'
import Router from 'express-promise-router'
import jlinx from './jlinx.js'

const debug = Debug('jlinx.api')
const router = Router()
export default router

router.get('/id', (req, res) => {
  res.json({
    id: jlinx.id,
    did: jlinx.did,
  })
})

router.use((req, res, next) => {
  res.status(404).json({})
})

// TODO dry up this dup error hadling into app-shared
router.use(async (error, req, res, next) => {
  res.status(500)
  res.json({
    error: {
      message: error?.message ?? error,
      stack: error?.stack,
    }
  })
})