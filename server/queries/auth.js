export * from 'app-shared/server/queries/auth.js'

export async function getCurrentUser({}, context){
  const currentUser = await context.queries.auth._selectCurrentUser({
    jlinxAgentDid: true,
    displayName: true,
    avatar: true,
  })
  if (currentUser) return currentUser
}
