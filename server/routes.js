import jlinxRoutes from './jlinxRoutes.js'

export default router => {
  router.use('/api/jlinx/v1', jlinxRoutes)
}
