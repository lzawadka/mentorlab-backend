import { UserRole } from "../../domain/enums/user-role.enum";

export const UserRolesPermissions: Record<UserRole, {
    global: boolean;
    clientAccess: boolean;
    canCreateClient: boolean;
    canViewAllClients: boolean;
}> = {
    [UserRole.ADMIN]: {
      global: true,
      clientAccess: true,
      canCreateClient: true,
      canViewAllClients: true
    },
    [UserRole.CLIENT_ADMIN]: {
      global: false,
      clientAccess: true,
      canCreateClient: false,
      canViewAllClients: false
    },
    [UserRole.COACH]: {
      global: false,
      clientAccess: true,
      canCreateClient: false,
      canViewAllClients: false
    },
    [UserRole.PARTICIPANT]: {
      global: false,
      clientAccess: true,
      canCreateClient: false,
      canViewAllClients: false
    },
} as const;
  