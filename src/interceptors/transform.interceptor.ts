import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
// import { CurrentUser } from '@ngo-backend/core-service';
import { Request } from 'express';
import requestIp from 'request-ip';
import { map, Observable } from 'rxjs';
import { Lang, messageMap, ResponseCode } from '../constants';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T> | StreamableFile>
{
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T> | StreamableFile> {
    const req = context.switchToHttp().getRequest<Request>();

    const acceptLangs = req.header('Accept-Language') || '';

    const langs = acceptLangs.split(';').map((l) => {
      const [, code] = l.split(',');
      return code;
    });

    const preferLang = (langs.find((l) => l === Lang.Vi || l === Lang.En) ||
      Lang.Vi) as Lang;
    const startTime = Date.now();
    return next.handle().pipe(
      map((data) => {
        if (req.originalUrl.includes('/gantt/')) {
          return data;
        }

        if (data instanceof StreamableFile) {
          return data;
        }
        console.log(
          `ID: ${req.header('fx-request-id')}, IP: ${requestIp.getClientIp(req)}, Endpoint: ${req.originalUrl}, Response time: ${Date.now() - startTime}ms, Time: ${Date()}`,
        );
        return {
          time: Date.now() - startTime,
          code: ResponseCode.Success,
          message: messageMap[ResponseCode.Success][preferLang],
          data,
        };
      }),
    );
  }
}
