import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const tokenCookie = request.cookies['token'];

    if (!tokenCookie) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = this.jwtService.verify(tokenCookie);
      request['user'] = payload;
      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
