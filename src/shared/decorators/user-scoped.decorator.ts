import { SetMetadata } from '@nestjs/common';

export const USER_SCOPED_KEY = 'userScoped';
export const UserScoped = () => SetMetadata(USER_SCOPED_KEY, true);
