import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ConvertCastErrorToHttpInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: { name: string; message: string }) => {
        if (err.name == 'CastError') {
          return throwError(
            () => new HttpException(err.message, HttpStatus.BAD_REQUEST),
          );
        } else {
          return throwError(err);
        }

        return throwError(err);
      }),
    );
  }
}
