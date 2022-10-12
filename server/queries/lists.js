import prisma from 'app-shared/server/prisma.js'

export async function getAll({}, context){
  context.requireLoggedIn('get all lists')
  return await prisma.list.findMany({
    where: {
      userId: context.userId,
    },
    select: {
      id: true,
      createdAt: true,
      userId: true,
    },
  })
}

export async function getById({ id }, context){
  console.log({ id })
  context.requireLoggedIn(`get list id=${id}`)
  if (typeof id !== 'number' || id < 1) return null
  return await prisma.list.findFirst({
    where: {
      id,
      userId: context.userId,
    },
    select: {
      id: true,
      createdAt: true,
      userId: true,
    },
  })
}
