import { createContainer } from 'awilix';
import { registerRepositories } from './registry/repositoryContainer';
import { registerUseCases } from './registry/useCasesContainer';
// import { registerViewModels } from './registry/viewModelContainer';
import { registerCoreModules } from './registry/moduleContainer';
import { registerLogContainer } from './registry/loggingContainer';

// Create the DI container
const container = createContainer();

registerCoreModules(container);
registerRepositories(container);
registerUseCases(container);
// registerViewModels(container);
registerLogContainer(container);

export default container;
