import { AwilixContainer, asFunction } from 'awilix';
import { FirebaseImpl } from '@infrastructure/logging/FirebaseAnalytic';

export function registerLogContainer(container: AwilixContainer) {
  container.register({
    firebaseLog: asFunction(FirebaseImpl),
  });
}
