import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { CLIENT_SCOPED_KEY } from '../decorators/client-scoped.decorator';
  
@Injectable()
export class ClientPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const isClientScoped = this.reflector.get<boolean>(
        CLIENT_SCOPED_KEY,
        context.getHandler()
    );

    if (isClientScoped) {
        const clientIdFromToken = user.clientId;
        const clientIdFromRequest = Number(request.params.clientId || request.body.clientId );
        if ((user.role !== 'admin' && user.role !== 'coach') && clientIdFromToken != clientIdFromRequest) {
            throw new ForbiddenException(
            `Access restricted to resources of your client (clientId: ${clientIdFromToken})`,
            );
        }
    }

    return true;
  }
}
  