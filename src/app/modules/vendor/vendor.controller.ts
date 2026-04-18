import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VerdorServices } from './vendor.service';

const createVendorProfile = catchAsync(async (req, res) => {
  const userId = req.user?.userId;

  const result = await VerdorServices.createVendorProfileIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Vendor Profile created successfully',
    data: result,
  });
});

export const VendorControllers = {
  createVendorProfile,
};
