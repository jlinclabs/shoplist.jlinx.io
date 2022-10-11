import prisma from 'app-shared/server/prisma.js'

export async function create(){
  prisma.list.create({
    data: {

    },
    select: {

    }
  })
}
