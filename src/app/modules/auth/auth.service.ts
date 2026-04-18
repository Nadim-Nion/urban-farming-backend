import status from 'http-status';
import prisma from '../../../lib/prisma';
import config from '../../config';
import AppError from '../../errors/AppError';
import { comparePassword, hashPassword } from '../../utils/hash';
import type { RegisterUser } from './auth.interface.';
import { createToken } from './auth.utilts';

const registerIntoDB = async (userData: RegisterUser) => {
  /* 
    Steps to register a user:
    1. Find user with the same email
    2. If user exists, throw an error
    3. Hash the password
    4. Create a new user in the database
    */

  // Find user with the same email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    throw new AppError(
      status.BAD_REQUEST,
      'User with this email already exists',
    );
  }

  // Hash the password
  const hashedPassword = await hashPassword(userData.password);

  // Crate a new user in the database
  const newUser = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    },
  });

  return newUser;
};

const loginUser = async (payload: { email: string; password: string }) => {
  // Check the user is exist by it's email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!existingUser) {
    throw new AppError(status.NOT_FOUND, 'User is not found');
  }

  // Match the password
  const isPasswordMatched = comparePassword(
    payload.password,
    existingUser.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(status.NOT_FOUND, 'Credentials are invalid');
  }

  // Access Granted: send access and refresh token
  // Create and send access token to the client
  const jwtPayload = {
    userId: existingUser.id,
    role: existingUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Create and send refresh token to the client
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerIntoDB,
  loginUser,
};
