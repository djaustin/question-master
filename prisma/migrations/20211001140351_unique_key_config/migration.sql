/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Config` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");
