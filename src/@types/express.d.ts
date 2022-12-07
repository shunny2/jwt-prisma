import { IUser } from "../utils/types";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<IUser>
        }
    }
}