import { URL } from 'node:url'
import { encodeKey, validateSigningKeypair } from 'app-shared/jlinx/crypto.js'

const publicKey = Buffer.from(process.env.JLINX_AGENT_PUBLIC_KEY, 'hex')
const secretKey = Buffer.from(process.env.JLINX_AGENT_SECRET_KEY, 'hex')
// TODO
// if (!validateSigningKeypair({ publicKey, secretKey })){
//   throw new Error(`invalid agent keypair`)
// }

const host = new URL(process.env.APP_ORIGIN).host
const id = encodeKey(publicKey)
const did = `did:web:${host}`

const jlinx = {
  id,
  did,
  publicKey,

  get didDocument () {
    return {
      "@context": "https://www.w3.org/ns/did/v1",
      "id": did,
      "verificationMethod": [{
         "id": `${did}#controller`,
         "type": "Secp256k1VerificationKey2018", // ??
         "controller": did,
      }],
      "authentication": [
         `${did}#controller`
      ]
    }
  },

  async loginWithAgentEmail(email){
    const [publicKey, domain] = email.split('@')
    console.log({ email, domain, publicKey })

    const res = await this.postSignedJSON(
      `https://${domain}/api/jlinx/v1/login`,
      { publicKey }
    )

    return {
      email, domain, publicKey, res
    }
  },

  sign(){

  },

  signObject(){

  },

  verifySignedObject(){

  },


  async postSignedJSON(url, payload, options){
    const body = JSON.stringify(payload)
    const signedBody = this.signObject(body)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Referer': process.env.APP_ORIGIN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: signedBody
    })
    return res.json()
  },
}


export default jlinx