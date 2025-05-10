import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'An unexpected error occurred' };

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse['message'] || 'An unexpected error occurred';

    response
      .status(httpStatus)
      .json({
        data: null,
        message: Array.isArray(message) ? message.join(', ') : message,
        statusCode: httpStatus,
        isSuccess: false
      });
  }
}