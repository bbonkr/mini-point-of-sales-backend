import { User as UserModel } from '../entities/User';
import { Role } from '../entities/Role';

declare global {
    namespace Express {
        export interface User {
            id: string;
            username: string;
        }

        export interface Request {
            user?: User;
            userInfo?: UserModel;
            roles?: Role[];
        }
    }
}

// declare namespace Express {
//     export interface User {
//         id: number;
//         username: string;
//     }

//     export interface Request {
//         user?: User;
//         userInfo?: UserModel;
//         roles?: Role[];
//     }
// }
