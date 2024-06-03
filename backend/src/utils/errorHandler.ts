export const errorHandler = (statusCode: number, message: string): any => {
    const error: any = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
