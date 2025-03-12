import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
  
@Injectable()
export class RolesPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!roles) return true; 

    if (!user || !user.role)
      throw new ForbiddenException('No role found in token');

    const userRole = UserRole[user.role.toUpperCase() as keyof typeof UserRole];
    if (!userRole) throw new ForbiddenException(`Invalid role: ${user.role}`);

    if (!roles.includes(user.role)) throw new ForbiddenException(`Access denied for role: ${user.role}`);

    return true;
  }
}
  