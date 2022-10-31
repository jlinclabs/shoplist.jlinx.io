import jlinxApp from '../jlinxApp.js'
import { allFields } from '../queries/lists.js'

export async function create({ name, value = {} }, context){
  const jlinxAgent = await context.queries.auth._getJlinxAgent()
  let jlinxDocument
  if (jlinxAgent){
    jlinxDocument = jlinxApp.createDocument({
      agent: jlinxAgent.did,
      host: jlinxAgent.host,
      name,
      value,
    })
  }
  const record = await context.prisma.list.create({
    data: {
      userId: context.userId,
      name,
      value,
      jlinxDocumentId: jlinxDocument?.id,
    },
    select: allFields
  })
  return record
}

export async function update({ value }, context){
  return await context.prisma.list.create({
    data: {
      userId: context.userId,
      value,
    },
    select: allFields
  })
}
