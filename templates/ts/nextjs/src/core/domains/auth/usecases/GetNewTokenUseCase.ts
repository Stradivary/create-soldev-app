import { Auth } from '../entities';
import { DomainResult } from '@core/utils/DomainResult';
import { AuthRemoteRepository } from '../repositories/remote/AuthRemoteRepository';

export interface GetNewTokenUseCase {
  execute(refreshToken: string): Promise<DomainResult<Auth>>;
}

export const GetNewTokenUseCaseimpl = ({
  authRemoteRepository,
}: {
  authRemoteRepository: AuthRemoteRepository;
}): GetNewTokenUseCase => {
  return {
    execute: async (refreshToken: string) => {
      return await authRemoteRepository.getNewToken(refreshToken);
    },
  };
};
