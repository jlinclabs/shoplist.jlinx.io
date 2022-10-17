import * as auth from 'app-shared/server/commands/auth.js'
export * from 'app-shared/server/commands/auth.js'

export async function login({ email }, context){
  console.log('shoplist signup', { email })
  await auth.validateSignup({ email }, context)

  const record = (
    await auth._findUserByEmail({email}, context) ||
    await auth._createUser({email}, context)
  )

  await context.loginAs(record.id)
  return await context.queries.auth.getCurrentUser()
}