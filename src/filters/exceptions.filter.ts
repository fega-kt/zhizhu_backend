import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Request } from 'express';
import _ from 'lodash';
import { ExceptionBase, Lang, messageMap } from '../constants';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ERROR');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: Error, context: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const req = context.switchToHttp().getRequest<Request>();

    const acceptLangs = req.header('Accept-Language') || '';

    const langs = acceptLangs.split(';').map((l) => {
      const [, code] = l.split(',');
      return code;
    });

    const preferLang = (langs.find((l) => l === Lang.Vi || l === Lang.En) ||
      Lang.Vi) as Lang;

    let code: number;
    let httpStatus: number;
    let message: string;
    let stack: string;

    if (error instanceof ExceptionBase) {
      code = error.getCode();
      httpStatus = error.getStatus();
      message = messageMap[error.getCode()][preferLang];
      stack = error.getRef() as string;
    } else {
      httpStatus =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      code = httpStatus;
      message =
        error instanceof HttpException ? error.message : 'Unexpected exception';
      stack = error.stack || '';
    }

    this.logger.error(`[${_.get(req, 'id')}] ${req.path} - ${stack}`);

    const body = { code, message, stack: '' };

    // if (!environment.production) {
    //   body.stack = stack;
    // }
    body.stack = stack;

    httpAdapter.reply(context.switchToHttp().getResponse(), body, httpStatus);
  }
}
