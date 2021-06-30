import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Optional } from '@nestjs/common';

import { WinstonLogger } from '../logger/winston.logger';
import { Response } from 'express';

@Catch(HttpException)
export class BusinessLogicFilter implements ExceptionFilter {
  constructor(@Optional() public readonly logger?: WinstonLogger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    let status: number;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (!exception.getStatus()) {
      status = HttpStatus.BAD_REQUEST;
    } else {
      status = exception.getStatus();
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });

    if (this.logger) {
      this.logger.error(exception.message, exception.stack!, 'LogicFilter');
    }
  }
}
