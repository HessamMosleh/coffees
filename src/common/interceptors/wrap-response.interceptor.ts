import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    //TAP
    return next.handle().pipe(tap((data) => console.log('After...', data)));
    //MAP
    // return next.handle().pipe(map((data) => ({ data })));
  }
}
