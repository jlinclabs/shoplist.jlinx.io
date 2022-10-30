import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'
import { isEmail } from 'app-shared/shared/emails.js'
import { InvalidArgumentError } from 'app-shared/server/errors.js'
import jlinxApp from '../jlinxApp.js'

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

export async function requestLogin({ email }, context){
  validateEmail(email)
  return await jlinxApp.loginWithAgentEmail(email)
}

export async function waitForLoginRequestResult({ host, id }, context){
  if (!host) throw new InvalidArgumentError('host', host)
  if (!id) throw new InvalidArgumentError('id', id)
  return await jlinxApp.waitForLoginRequestResult({ host, id })
}


function validateEmail(email){
  if (!isEmail(email)) throw new InvalidArgumentError('email', email)
}