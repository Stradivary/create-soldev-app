import { User } from '../entities';
import { DomainResult } from '@core/utils/DomainResult';
import { AuthRemoteRepository } from '../repositories/remote/AuthRemoteRepository';

export interface GetListUserUseCase {
  execute(): Promise<DomainResult<User[]>>;
}

export const GetListUserUseCaseImpl = ({
  authRemoteRepository,
}: {
  authRemoteRepository: AuthRemoteRepository;
}): GetListUserUseCase => {
  return {
    execute: async () => {
      return await authRemoteRepository.getListUser();
    },
  };
};
