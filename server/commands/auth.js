import fetch from 'node-fetch'
import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'
import { isEmail } from 'app-shared/shared/emails.js'
import { InvalidArgumentError } from 'app-shared/server/errors.js'

export async function login({ email }, context){
  console.log('shoplist signup', { email })
  validateEmail(email)
  await auth.validateSignup({ email }, context)

  const record = (
    await auth._findUserByEmail({email}, context) ||
    await auth._createUser({email}, context)
  )

  await context.loginAs(record.id)
  return await context.queries.auth.getCurrentUser()
}

export async function loginViaAgent({ email }, context){
  validateEmail(email)
  const [encodedPublicKey, domain] = email.split('@')
  console.log({ email, domain, encodedPublicKey })
  // TODO: const publicKey = decodeKey(encodedPublicKey)

  const res = await fetch(`https://${domain}/api/jlinx/v1/login`, {
    method: 'POST',
    headers: {
      'Referer': process.env.APP_ORIGIN,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email }), // TODO sign the payload wit this agents public key
  })
  const resBody = await res.json()
  return { email, domain, resBody }
}


function validateEmail(email){
  if (!isEmail(email)) throw new InvalidArgumentError('email', email)
}