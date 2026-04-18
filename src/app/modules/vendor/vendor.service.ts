import status from 'http-status';
import prisma from '../../../lib/prisma';
import AppError from '../../errors/AppError';
import { VENDOR_STATUS } from './vendor.constant';
import type { TVendorProfile } from './vendor.interface';

const createVendorProfileIntoDB = async (userId: string, payload: TVendorProfile) => {
  // Check the Vendor profile exists
  const existingVendor = await prisma.vendorProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingVendor) {
    throw new AppError(status.BAD_REQUEST, 'Vendor Profile already exists');
  }

  const result = await prisma.vendorProfile.create({
    data: {
      userId: userId,
      farmName: payload.farmName,
      certificationStatus: VENDOR_STATUS.PENDING,
      farmLocation: payload.farmLocation,
    },
  });

  return result;
};

export const VerdorServices = {
  createVendorProfileIntoDB,
};
