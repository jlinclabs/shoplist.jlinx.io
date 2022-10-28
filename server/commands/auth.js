import fetch from 'node-fetch'
import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'
import { isEmail } from 'app-shared/shared/emails.js'
import { InvalidArgumentError } from 'app-shared/server/errors.js'
import jlinx from '../jlinx.js'

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
  const enoughToLogin = await jlinx.loginWithAgentEmail(email)
  console.log({ enoughToLogin })

  return { enoughToLogin }
}


function validateEmail(email){
  if (!isEmail(email)) throw new InvalidArgumentError('email', email)
}