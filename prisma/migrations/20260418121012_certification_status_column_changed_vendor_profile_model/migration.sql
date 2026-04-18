/*
  Warnings:

  - The `certificationStatus` column on the `vendor_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "vendor_profiles" DROP COLUMN "certificationStatus",
ADD COLUMN     "certificationStatus" "VendorStatus" NOT NULL DEFAULT 'PENDING';
