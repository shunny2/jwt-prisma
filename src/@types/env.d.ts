namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        JWT_SECRET: string;
        JWT_REFRESH_SECRET: string;
        EXPIRES_IN_JWT_SECRET: string | number;
        EXPIRES_IN_JWT_REFRESH_SECRET: string | number;
    }
}