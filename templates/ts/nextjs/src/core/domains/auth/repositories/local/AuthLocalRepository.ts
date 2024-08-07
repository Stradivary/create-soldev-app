import { DomainResult } from '@core/utils/DomainResult';
import { Auth } from '@core/domains/auth/entities';

export interface AuthLocalRepository {
  getAuthData: () => Promise<DomainResult<Auth | undefined>>;
  saveAuthData: (auth: Auth) => Promise<DomainResult<boolean>>;
  removeAuthData: () => Promise<DomainResult<boolean>>;
}
