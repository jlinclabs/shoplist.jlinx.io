import jlinxApp from '../jlinxApp.js'
import { allFields } from '../queries/lists.js'

export async function create({ name, value = {} }, context){
  const jlinxAgent = await context.queries.auth._getJlinxAgent()
  console.log('CREATE LIST', {jlinxAgent})
  let jlinxDocument
  if (jlinxAgent){
    jlinxDocument = await jlinxApp.createDocument({
      did: jlinxAgent.did,
      host: jlinxAgent.host,
      name,
      value,
    })
  }
  console.log({ jlinxDocument })
  const record = await context.prisma.list.create({
    data: {
      userId: context.userId,
      name,
      value,
      jlinxDocumentId: jlinxDocument?.id,
    },
    select: allFields
  })
  console.log('CREATED NEW LIST', record)
  return record
}

export async function update({ id, value }, context){
  // TODO Access control
  console.log('🔥', { id, value })
  const list = await context.queries.lists.getById({ id })
  console.log('🔥', { list })
  const jlinxAgent = await context.queries.auth._getJlinxAgent()
  let jlinxDocument
  if (jlinxAgent){
    jlinxDocument = await jlinxApp.updateDocument({
      did: jlinxAgent.did,
      host: jlinxAgent.host,
      id: list.jlinxDocumentId,
      value,
      name: list.name
    })
    value = jlinxDocument.value
  }
  return await context.prisma.list.update({
    where: { id },
    data: { value },
    select: allFields
  })
}
