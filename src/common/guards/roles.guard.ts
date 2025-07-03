import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) {
      console.log(requiredRoles)
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user, 'user at canActivate^rolesgard')

    if (!user || !user.role || !requiredRoles.includes(user.role)) {
      console.log(user, 'user at canActivate^rolesgard')
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}