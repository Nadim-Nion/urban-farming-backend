/*
  Warnings:

  - You are about to drop the `CommunityPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalSpace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SustainabilityCert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityPost" DROP CONSTRAINT "CommunityPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_produceId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userid_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "RentalSpace" DROP CONSTRAINT "RentalSpace_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "SustainabilityCert" DROP CONSTRAINT "SustainabilityCert_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "VendorProfile" DROP CONSTRAINT "VendorProfile_userId_fkey";

-- DropTable
DROP TABLE "CommunityPost";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "RentalSpace";

-- DropTable
DROP TABLE "SustainabilityCert";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VendorProfile";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "certificationStatus" TEXT NOT NULL,
    "farmLocation" TEXT NOT NULL,

    CONSTRAINT "vendor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "certificationStatus" TEXT NOT NULL,
    "availableQuantity" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_spaces" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "rental_spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "produceId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_posts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postContent" TEXT NOT NULL,
    "postDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "community_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sustainability_certs" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "certifyingAgency" TEXT NOT NULL,
    "certificationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sustainability_certs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_profiles_userId_key" ON "vendor_profiles"("userId");

-- AddForeignKey
ALTER TABLE "vendor_profiles" ADD CONSTRAINT "vendor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_spaces" ADD CONSTRAINT "rental_spaces_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_produceId_fkey" FOREIGN KEY ("produceId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sustainability_certs" ADD CONSTRAINT "sustainability_certs_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
