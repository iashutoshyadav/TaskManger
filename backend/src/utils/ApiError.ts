export class ApiError extends Error {
    public readonly status: number;
    public readonly isOperational: boolean;

    constructor(message: string, status: number = 500, isOperational: boolean = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;

        Object.setPrototypeOf(this, ApiError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

    public static badRequest(msg: string) {
        return new ApiError(msg, 400);
    }

    public static unauthorized(msg: string = "Unauthorized") {
        return new ApiError(msg, 401);
    }

    public static forbidden(msg: string = "Forbidden") {
        return new ApiError(msg, 403);
    }

    public static notFound(msg: string = "Resource not found") {
        return new ApiError(msg, 404);
    }

    public static internal(msg: string = "Internal Server Error") {
        return new ApiError(msg, 500);
    }
}
