// filepath: d:\Sagar.Ghadage096@gmail.com\Full-Stack-Dev\MERN_PROJECTS\User Management Portal\user-management-portal-backend\src\common\decorators\roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);