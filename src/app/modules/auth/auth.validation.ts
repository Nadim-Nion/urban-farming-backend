import z from 'zod';
import { USER_ROLE } from './auth.constant';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Name must be a string' }),
    email: z
      .string({ error: 'Email must be a string' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ error: 'Password must be a string' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
    role: z.enum(USER_ROLE, {
      message: `Role must be one of the following: ${USER_ROLE.join(', ')}`,
    }),
  }),
});

export const AuthValidations = {
  registerValidationSchema,
};
