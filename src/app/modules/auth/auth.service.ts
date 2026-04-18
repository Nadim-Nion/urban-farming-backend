import status from 'http-status';
import prisma from '../../../lib/prisma';
import AppError from '../../errors/AppError';
import { hashPassword } from '../../utils/hash';
import type { RegisterUser } from './auth.interface.';

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

export const AuthServices = {
  registerIntoDB,
};
