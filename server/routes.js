import { validateSigningKeypair } from 'app-shared/server/crypto.js'
console.log('custom routes loaded')

const publicKey = Buffer.from(process.env.JLINX_AGENT_PUBLIC_KEY, 'hex')
const secretKey = Buffer.from(process.env.JLINX_AGENT_SECRET_KEY, 'hex')

// TODO
// if (!validateSigningKeypair({ publicKey, secretKey })){
//   throw new Error(`invalid agent keypair`)
// }

export default router => {
  router.get('/api/jlinx/v1/id', (req, res, next) => {
    res.json({
      this_was: 'a custom route', now: Date.now()
    })
  })
}
