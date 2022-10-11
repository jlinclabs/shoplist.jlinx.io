console.log('custom routes loaded')

export default router => {
  router.get('/custom/route', (req, res, next) => {
    res.json({ this_was: 'a custom route', now: Date.now() })
  })
}
