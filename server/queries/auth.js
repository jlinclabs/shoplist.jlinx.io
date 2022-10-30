export * from 'app-shared/server/queries/auth.js'
import jlinxApp from '../jlinxApp.js'

export async function getCurrentUser({}, context){
  const currentUser = await context.queries.auth._selectCurrentUser({
    jlinxAgentHost: true,
    jlinxAgentDid: true,
    displayName: true,
    avatar: true,
  })
  if (!currentUser) return
  console.log({ currentUser })
  if (currentUser.jlinxAgentDid){
    const profile = await jlinxApp.getAgentProfile({
      host: currentUser.jlinxAgentHost,
      did: currentUser.jlinxAgentDid,
    })
    currentUser.displayName = profile.displayName
    currentUser.avatar = profile.avatar
  }
  return currentUser
}

