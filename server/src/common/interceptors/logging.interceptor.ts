import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip } = request;
    const user = (request as any).user;

    const now = Date.now();
    const timestamp = new Date().toISOString();

    // Log incoming request
    console.log(
      `📥 [${timestamp}] ${method} ${url} - IP: ${ip} - User: ${user ? user.email : 'Guest'}`,
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - now;
          console.log(
            `✅ [${new Date().toISOString()}] ${method} ${url} - ${responseTime}ms`,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          console.error(
            `❌ [${new Date().toISOString()}] ${method} ${url} - ${responseTime}ms - Error: ${error.message}`,
          );
        },
      }),
    );
  }
}
