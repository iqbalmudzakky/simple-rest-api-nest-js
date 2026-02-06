import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    // context: ExecutionContext,
    // status?: any,
  ): TUser {
    if (err || !user) {
      const msg = 'Unauthorized access';
      switch (info?.name) {
        case 'TokenExpiredError':
          throw new UnauthorizedException('Token has expired');
        case 'JsonWebTokenError':
          throw new UnauthorizedException('Invalid token');
        default:
          throw new UnauthorizedException(msg);
      }
    }
    return user;
  }
}
