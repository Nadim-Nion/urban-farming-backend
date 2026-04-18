import type { RequestHandler } from 'express';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const register: RequestHandler = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const result = await AuthServices.registerIntoDB({
    name,
    email,
    password,
    role,
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login: RequestHandler = catchAsync(async (req , res) => {
    const {email, password} = req.body;

    const result = await AuthServices.loginUser({email, password});

    sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged-in successfully',
    data: result,
  });
});

export const AuthControllers = {
  register,
  login
};
