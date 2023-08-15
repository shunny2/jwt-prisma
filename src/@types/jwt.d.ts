import { IUser } from '../interfaces/user';

declare global {
    namespace jsonwebtoken {
        export type VerifyCallback = {
            user: Partial<IUser>
        }
    }
}