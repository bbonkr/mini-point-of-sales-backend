import { Role } from '../models/Role.model';

declare global {
    namespace Express {
        export interface Request {
            roles?: Role[];
        }
    }
}
