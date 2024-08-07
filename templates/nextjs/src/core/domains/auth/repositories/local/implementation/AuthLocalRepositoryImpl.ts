import { Auth } from '@core/domains/auth/entities';
import { LocalStorageProtocol } from '@core/protocols';
import { AuthLocalRepository } from '../AuthLocalRepository';
import { failure, success } from '@core/utils/DomainResult';

export const AuthLocalRepositoryImpl = ({
  localStorage,
}: {
  localStorage: LocalStorageProtocol;
}): AuthLocalRepository => {
  return {
    getAuthData: async () => {
      try {
        const data = localStorage.getItem('authData');
        if (data) {
          return success(JSON.parse(data));
        } else {
          return failure('No auth data found in local storage');
        }
      } catch (error) {
        return failure(`Failed to get Auth data from local storage: ${error}`);
      }
    },
    removeAuthData: async () => {
      try {
        localStorage.removeItem('authData');
        return success(true);
      } catch (error) {
        return failure(
          `Failed to remove Auth data from local storage: ${error}`,
        );
      }
    },
    saveAuthData: async (auth: Auth) => {
      try {
        localStorage.setItem('authData', JSON.stringify(auth));
        return success(true);
      } catch (error) {
        return failure(`Failed to save Auth data to local storage: ${error}`);
      }
    },
  };
};
