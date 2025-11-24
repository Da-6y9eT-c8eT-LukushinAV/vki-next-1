import jwt from 'jsonwebtoken';
import type UserInterface from '@/types/UserInterface';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface JWTPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export const generateAccessToken = (user: UserInterface): string => {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string | undefined): UserInterface | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return {
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      middleName: decoded.middleName,
    };
  }
  catch (error) {
    return null;
  }
};

