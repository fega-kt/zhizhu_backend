import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { CurrentUser } from '@ngo-backend/core-service';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import requestIp from 'request-ip';
import * as uuid from 'uuid';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const id = uuid.v4();

    _.set(req, 'id', id);

    res.on('close', () => {
      const { method, user, originalUrl } = req;
      console.log(user);
      const { statusCode } = res;

      const messages: string[] = [`[${id}]`];

      const client: string[] = [];

      const ip = requestIp.getClientIp(req);

      if (ip) {
        client.push(ip);
      }

      const userAgent = req.get('user-agent');

      if (userAgent) {
        client.push(userAgent);
      }

      messages.push(method);

      messages.push(originalUrl);

      messages.push(`${statusCode}`);

      // if (user) {
      //   messages.push((user as CurrentUser).loginName);
      // }

      messages.push(client.join(' '));

      this.logger.log(messages.join(' '));
    });

    next();
  }
}
