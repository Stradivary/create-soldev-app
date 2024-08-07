import { AwilixContainer, asFunction } from 'awilix';
import { AuthLocalRepositoryImpl } from '@core/domains/auth/repositories/local/implementation/AuthLocalRepositoryImpl';
import { AuthRemoteRepositoryImpl } from '@core/domains/auth/repositories/remote/implementation/AuthRemoteRepositoryImpl';

export function registerRepositories(container: AwilixContainer) {
  container.register({
    authLocalRepository: asFunction(
      AuthLocalRepositoryImpl,
    ).singleton(),
    authRemoteRepository: asFunction(AuthRemoteRepositoryImpl).singleton()
  });
}
