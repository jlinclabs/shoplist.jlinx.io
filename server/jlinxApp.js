import { URL } from 'node:url'
import { JlinxApp } from 'app-shared/jlinx/app.js'

const jlinxApp = await JlinxApp.open({
  secretSeed: Buffer.from(process.env.JLINX_APP_SECRET_SEED, 'hex'),
  host: new URL(process.env.APP_ORIGIN).host,
})

console.log({ jlinxApp })

export default jlinxApp
