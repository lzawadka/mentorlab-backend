import { UserRole } from "src/domain/enums/user-role.enum";

export class ValidateUserDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    clientId?: number;
}