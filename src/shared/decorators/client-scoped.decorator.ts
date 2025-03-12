import { SetMetadata } from '@nestjs/common';

export const CLIENT_SCOPED_KEY = 'clientScoped';
export const ClientScoped = () => SetMetadata(CLIENT_SCOPED_KEY, true);
