-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "kdr" DOUBLE PRECISION NOT NULL,
    "matches" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
