import { JwtOptions } from '../lib/JwtOptions';
import dotenv from 'dotenv';

dotenv.config();

export const jwtOptions: JwtOptions = {
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  secret: process.env.JWT_SECRET || ''
};
