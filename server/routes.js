import jlinxApp from './jlinxApp.js'
import jlinxRoutes from './jlinxRoutes.js'

export default router => {
  router.get('/.well-known/did.json', async (req, res) => {
    res.json(await jlinxApp.getDIDDocument())
  })
  router.use('/api/jlinx/v1', jlinxRoutes)
}
