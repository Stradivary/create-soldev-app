import { DomainResult } from '@core/utils/DomainResult';
import { Auth } from '../entities';
import { AuthLocalRepository } from '../repositories/local/AuthLocalRepository';

export interface GetUserInfoUseCase {
  execute: () => Promise<DomainResult<Auth | undefined>>;
}

export const GetUserInfoUseCaseImpl = ({
  authLocalRepository,
}: {
  authLocalRepository: AuthLocalRepository;
}): GetUserInfoUseCase => ({
  execute: async () => {
    return authLocalRepository.getAuthData();
  },
});
