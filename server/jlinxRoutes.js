import Debug from 'debug'
import Router from 'express-promise-router'
import jlinx from './jlinx.js'

const debug = Debug('jlinx.api')
const router = Router()
export default router

router.get('/api/jlinx/v1/id', (req, res) => {
  res.json({
    id: jlinx.id,
    did: jlinx.did,
  })
})