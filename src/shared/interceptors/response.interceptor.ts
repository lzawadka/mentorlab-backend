import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const status = context.switchToHttp().getResponse().statusCode;
  
          return {
            data: data ?? null,
            message: data?.message ?? '',
            statusCode: status,
            isSuccess: status >= 200 && status < 300,
          };
        }),
      );
    }
  }
  