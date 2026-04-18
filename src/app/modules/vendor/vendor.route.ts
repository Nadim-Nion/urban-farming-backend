import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE_OBJ } from '../auth/auth.constant';
import { VendorControllers } from './vendor.controller';
import { VendorValidations } from './vendor.validation';

const router = express.Router();

router.post(
  '/create-vendor-profile',
  auth(USER_ROLE_OBJ.VENDOR),
  validateRequest(VendorValidations.createVendorProfileValidationSchema),
  VendorControllers.createVendorProfile,
);

export const VendorRoutes = router;
