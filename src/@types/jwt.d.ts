import { IUser } from "../utils/types";

declare global {
    namespace jsonwebtoken {
        export type VerifyCallback = {
            user: Partial<IUser>
        }
    }
}