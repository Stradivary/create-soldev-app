import axiosAdapter from '@infrastructure/networking/axiosAdapter';
import { webStorageAdapter } from '@infrastructure/storage/webStorageAdapter';
import { AwilixContainer, asFunction, asValue } from 'awilix';
import {
  requestInterceptor
} from '@infrastructure/networking/requestInterceptor';
import { firebaseConfig } from '@infrastructure/logging/firebase.config';

export function registerCoreModules(container: AwilixContainer) {
  container.register({
    apiRequest: asFunction(axiosAdapter).inject(() => ({
      requestInterceptor: requestInterceptor,
      refreshInterceptor: undefined,
    })),
    localStorage: asValue(webStorageAdapter),
    firebaseOptions: asValue(firebaseConfig),
  });
}
