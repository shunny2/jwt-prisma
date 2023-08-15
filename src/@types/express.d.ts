import { IUser } from '../interfaces/user';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<IUser>
        }
    }
}