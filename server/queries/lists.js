import jlinxApp from '../jlinxApp.js'

export const allFields = Object.freeze({
  id: true,
  createdAt: true,
  userId: true,
  name: true,
  value: true,
  jlinxDocumentId: true,
})


export async function getAll({}, context){
  context.requireLoggedIn('get all lists')
  const jlinxAgent = await context.queries.auth._getJlinxAgent()
  const records = await context.prisma.list.findMany({
    where: {
      userId: context.userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: allFields,
  })
  // jlinxApp.

  // const jlinxDocuments = await jlinxApp.getDocuments({
  //   did: jlinxAgent.did,
  //   host: jlinxAgent.host,
  //   ids: records.map(l => l.jlinxDocumentId),
  //   // value,
  //   // name: list.name
  // })
  //
  //

  return { lists: records }
}

export async function getById({ id }, context){
  console.log({ id })
  context.requireLoggedIn(`get list id=${id}`)
  const record = await context.prisma.list.findUnique({
    where: {
      id,
      // userId: context.userId,
    },
    select: allFields,
  })

  // TODO get latest version from agent

  return record
}
