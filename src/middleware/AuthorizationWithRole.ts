import { RoleValue } from '../entities/Role.entity';
import { RoleNames } from '../lib/enums/Roles';

export class AuthorizationWithRole {
  public memberOfRole(roles: RoleValue[], requireRole: RoleNames): boolean {
    const hasRole = roles.find(role => role.name === requireRole);

    return !!hasRole;
  }
}
