import { AwilixContainer, asFunction } from 'awilix';
import { GetListUserUseCaseImpl } from '@core/domains/auth/usecases/GetListUserUseCase';
import { GetNewTokenUseCaseimpl } from '@core/domains/auth/usecases/GetNewTokenUseCase';
import { GetUserInfoUseCaseImpl } from '@core/domains/auth/usecases/GetUserInfoUseCase';
import { LoginUseCaseImpl } from '@core/domains/auth/usecases/LoginUseCase';
import { LogoutUseCaseImpl } from '@core/domains/auth/usecases/LogoutUseCase';

export function registerUseCases(container: AwilixContainer) {
  container.register({
    getListUserUseCase: asFunction(GetListUserUseCaseImpl).singleton(),
    getNewTokenUseCase: asFunction(GetNewTokenUseCaseimpl).singleton(),
    getUserInfoUseCase: asFunction(GetUserInfoUseCaseImpl).singleton(),
    loginUseCase: asFunction(LoginUseCaseImpl).singleton(),
    logoutUseCase: asFunction(LogoutUseCaseImpl).singleton()
  });
}
