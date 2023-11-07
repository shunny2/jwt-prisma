namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
        PORT: number;

        JWT_SECRET: string;
        JWT_REFRESH_SECRET: string;
        EXPIRES_IN_JWT_SECRET: string | number;
        EXPIRES_IN_JWT_REFRESH_SECRET: string | number;

        HOST: string;
        SERVICE: string;
        EMAIL_PORT: number;
        SECURE: boolean;
        USERNAME: string;
        PASSWORD: string;
    }
}