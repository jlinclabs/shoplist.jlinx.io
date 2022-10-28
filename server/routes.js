import jlinx from './jlinx.js'
import jlinxRoutes from './jlinxRoutes.js'

export default router => {
  router.get('/.well-known/did.json', (req, res) => {
    res.json(jlinx.didDocument)
  })
  router.use('/api/jlinx/v1', jlinxRoutes)
}
