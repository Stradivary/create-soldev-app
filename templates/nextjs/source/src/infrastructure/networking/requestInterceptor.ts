import { InternalAxiosRequestConfig } from 'axios';
import container from '@di/container';
import { AuthLocalRepository } from '@core/domains/auth/repositories/local/AuthLocalRepository';
import { ResultType } from '@core/utils/ResultType';

export const requestInterceptor = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> => {
  const credential = await container.resolve<AuthLocalRepository>("authLocalRepository").getAuthData();
  if (credential.type === ResultType.Success) {
    config.headers['Authorization'] = 'Bearer ' + credential.data?.token;
  }
  return config;
};
