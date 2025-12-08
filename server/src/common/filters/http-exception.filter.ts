import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Extract user info if available (from JWT token)
    const user = (request as any).user;

    // Build error log object
    const errorLog = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      user: user
        ? {
            id: user.sub,
            email: user.email,
            role: user.role,
          }
        : 'Unauthenticated',
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    };

    // Log the error with full details
    console.error('🚨 HTTP Exception:', JSON.stringify(errorLog, null, 2));

    // Log stack trace for 500 errors
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error('📚 Stack Trace:', exception);
    }

    // Send response to client
    response.status(status).json({
      statusCode: status,
      timestamp: errorLog.timestamp,
      path: request.url,
      message: typeof message === 'string' ? message : message,
    });
  }
}
