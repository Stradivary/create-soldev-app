import { Auth, User } from '@core/domains/auth/entities';
import { DomainResult } from '@core/utils/DomainResult';

export interface AuthRemoteRepository {
  login: (username: string, password: string) => Promise<DomainResult<Auth>>;
  getNewToken: (refreshToken: string) => Promise<DomainResult<Auth>>;
  getListUser: () => Promise<DomainResult<User[]>>;
}
