import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UniqueConstraintError, ValidationError } from 'sequelize';

@Catch()
export class SequelizeExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Handle Sequelize Validation and Unique Constraint Errors
    if (
      exception instanceof ValidationError ||
      exception instanceof UniqueConstraintError
    ) {
      const messages = exception.errors.map((err) => err.message);
      return response.status(400).json({
        statusCode: 400,
        path: request.url,
        errors: messages,
      });
    }

    // Handle other HTTP exceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json({
        statusCode: status,
        path: request.url,
        errors: res,
      });
    }

    // Handle all other exceptions
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      path: request.url,
      errors: ['Internal Server Error'],
    });
  }
}
