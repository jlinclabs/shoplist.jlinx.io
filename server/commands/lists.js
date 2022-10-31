import { allFields } from '../queries/lists.js'

export async function create({ value }, context){
  return await context.prisma.list.create({
    data: {
      userId: context.userId,
      value,
    },
    select: allFields
  })
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
