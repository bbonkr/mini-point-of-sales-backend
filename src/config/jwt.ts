import { IJwtOptions } from '../@typings/IJwtOptions';
import dotenv from 'dotenv';

dotenv.config();

export const jwtOptions: IJwtOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET,
};
