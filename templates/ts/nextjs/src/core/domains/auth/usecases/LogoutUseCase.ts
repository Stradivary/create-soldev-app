import { DomainResult } from '@core/utils/DomainResult';
import { AuthLocalRepository } from '../repositories/local/AuthLocalRepository';

export interface LogoutUseCase {
  execute: () => Promise<DomainResult<boolean>>;
}

export const LogoutUseCaseImpl = ({
  authLocalRepository,
}: {
  authLocalRepository: AuthLocalRepository;
}): LogoutUseCase => ({
  execute: async () => {
    return authLocalRepository.removeAuthData();
  },
});
