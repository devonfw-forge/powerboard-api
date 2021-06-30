import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Optional } from '@nestjs/common';

import { WinstonLogger } from '../logger/winston.logger';
import { Response } from 'express';

@Catch(HttpException)
export class BusinessLogicFilter implements ExceptionFilter {
  constructor(@Optional() public readonly logger?: WinstonLogger) {}
  error_message = 'Something went wrong, Please try again in some moment';

  catch(exception: HttpException, host: ArgumentsHost): void {
    let status: number;
    let message: string;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (!exception.getStatus()) {
      status = HttpStatus.BAD_REQUEST;
      message = this.error_message;
    } else {
      status = exception.getStatus();
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });

    if (this.logger) {
      this.logger.error(exception.message, exception.stack!, 'LogicFilter');
    }
  }
}
