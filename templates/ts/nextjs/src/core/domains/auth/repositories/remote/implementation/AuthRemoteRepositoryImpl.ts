import { HttpProtocol } from '@core/protocols';
import { handleApiRequest } from '@core/utils/ProcessResponse';
import { AuthRemoteRepository } from '../AuthRemoteRepository';
import { AuthEndpoint } from '../api';
import { mapAuthRespDataToAuth, mapUserRespDataToUser } from '../mapper';

export const AuthRemoteRepositoryImpl = ({
  apiRequest,
}: {
  apiRequest: HttpProtocol;
}): AuthRemoteRepository => {
  return {
    login: (username: string, password: string) =>
      handleApiRequest(
        {
          apiRequest, endpoint: AuthEndpoint.login, method: 'post',
          reqBody: { username, password },
          mapper: mapAuthRespDataToAuth, errorMessage: 'Submit Login Failed'
        }),

    getNewToken: (refreshToken: string) =>
      handleApiRequest(
        {
          apiRequest, endpoint: AuthEndpoint.refreshToken, method: 'post',
          reqBody: { refreshToken },
          mapper: mapAuthRespDataToAuth, errorMessage: 'Refresh Token Failed'
        }),

    getListUser: () =>
      handleApiRequest(
        {
          apiRequest, endpoint: AuthEndpoint.getListUser, method: 'get',
          mapper: mapUserRespDataToUser, errorMessage: 'Get List User Failed'
        }),
  };
};