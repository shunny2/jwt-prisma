export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message?: string) {
        super(message ?? 'Forbidden', 403);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message?: string) {
        super(message ?? 'Unauthorized', 401);
    }
}