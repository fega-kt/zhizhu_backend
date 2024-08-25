import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      catchError((error) => {
        const domain = request.hostname;
        const path = request.url;
        const method = request.method;
        const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Unknown error';

        const logMessage = [
          `[Request failed]: Domain: ${domain}`,
          `Path: ${path}`,
          `Method: ${method}`,
          `Status Code: ${statusCode}`,
          `Message: ${message}`,
        ].join(' | ');

        this.logger.error(logMessage);

        return throwError(new HttpException(message, statusCode));
      }),
    );
  }
}
