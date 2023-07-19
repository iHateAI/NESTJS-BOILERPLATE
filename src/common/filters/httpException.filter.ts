import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | {
          statusCode: number;
          message: string;
          error: string;
        };

    if (typeof error === 'string') {
      res.status(status).json({
        success: false,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
        error,
      });
    } else {
      res.status(status).json({
        success: false,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
        ...error,
      });
    }
  }
}
