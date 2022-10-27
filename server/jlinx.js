import { URL } from 'node:url'
import { encodeKey, validateSigningKeypair } from 'app-shared/server/crypto.js'

const publicKey = Buffer.from(process.env.JLINX_AGENT_PUBLIC_KEY, 'hex')
const secretKey = Buffer.from(process.env.JLINX_AGENT_SECRET_KEY, 'hex')
// TODO
// if (!validateSigningKeypair({ publicKey, secretKey })){
//   throw new Error(`invalid agent keypair`)
// }

const host = new URL(process.env.APP_ORIGIN).host
const id = encodeKey(publicKey)
const did = `did:web:${host}:${id}`

export default {
  id,
  did,
  publicKey,
  signObject,

}


function signObject(){

}