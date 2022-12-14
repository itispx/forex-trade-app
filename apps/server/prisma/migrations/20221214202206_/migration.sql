-- CreateEnum
CREATE TYPE "Currency_Types" AS ENUM ('USD', 'GBP');

-- CreateEnum
CREATE TYPE "Status_Types" AS ENUM ('FAILED', 'PENDING', 'SUCCESSFUL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "USD" DOUBLE PRECISION NOT NULL DEFAULT 1000,
    "GBP" DOUBLE PRECISION NOT NULL DEFAULT 1000,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "baseCurrency" "Currency_Types" NOT NULL,
    "baseAmount" DOUBLE PRECISION NOT NULL,
    "convertedCurrency" "Currency_Types" NOT NULL,
    "convertedAmount" DOUBLE PRECISION NOT NULL,
    "status" "Status_Types" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userID_key" ON "Wallet"("userID");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
