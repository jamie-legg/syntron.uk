/*
  Warnings:

  - You are about to drop the column `kdr` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "kdr",
ADD COLUMN     "deaths" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "kills" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timePlayed" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "matches" SET DEFAULT 0;
