export async function create({}, context){
  return await context.prisma.list.create({
    data: {
      userId: context.userId,
    },
    select: {
      id: true,
      createdAt: true,
      userId: true,
    }
  })
}
