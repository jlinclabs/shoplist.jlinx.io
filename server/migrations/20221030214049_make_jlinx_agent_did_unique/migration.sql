/*
  Warnings:

  - A unique constraint covering the columns `[jlinxAgentDid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_jlinxAgentDid_key" ON "User"("jlinxAgentDid");
