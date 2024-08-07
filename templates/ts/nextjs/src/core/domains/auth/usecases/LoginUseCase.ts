import { DomainResult } from '@core/utils/DomainResult';
import { AuthRemoteRepository } from '../repositories/remote/AuthRemoteRepository';
import { Auth } from '../entities';
import { AuthLocalRepository } from '../repositories/local/AuthLocalRepository';
import { ResultType } from '@core/utils';

export interface LoginUseCase {
  execute: (
    username: string,
    password: string,
  ) => Promise<DomainResult<Auth | undefined>>;
}

export const LoginUseCaseImpl = ({
  authRemoteRepository,
  authLocalRepository,
}: {
  authRemoteRepository: AuthRemoteRepository;
  authLocalRepository: AuthLocalRepository;
}): LoginUseCase => ({
  execute: async (username: string, password: string) => {
    const result = await authRemoteRepository.login(username, password);
    if (result.type === ResultType.Success) {
      await authLocalRepository.saveAuthData(result.data);
    }
    return result;
  },
});