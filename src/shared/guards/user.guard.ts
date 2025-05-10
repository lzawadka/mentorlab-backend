import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { USER_SCOPED_KEY } from '../decorators/user-scoped.decorator';
  
@Injectable()
export class UserPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const isUserScoped = this.reflector.get<boolean>(
      USER_SCOPED_KEY,
      context.getHandler()
    );

    if (isUserScoped) {
      const userIdFromToken = user.userId;
      const userIdFromRequest = Number(request.params.userId || request.body.userId );
      if ((user.role !== 'admin' && user.role !== 'admin_client') && userIdFromToken != userIdFromRequest) {
        throw new ForbiddenException(
          `Access restricted to resources of your user (userId: ${userIdFromToken})`,
        );
      }
    }

    return true;
  }
}
  