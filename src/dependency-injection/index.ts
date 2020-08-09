import { IRegistry } from "../core/infrastructure/dependency-injection";
import types from "./Types";
import { ActionsRegistry } from "./ActionsRegistry";
import { RepositoryRegistry } from "./RepositoryRegistry";
import { ServicesRegistry } from "./ServicesRegistry";
import { CommonRegistry } from "./Inversify.config";
import { StartupRegistry } from "./StartupRegistry";

const registries: IRegistry[] = [
    new ActionsRegistry(),
    new RepositoryRegistry(),
    new ServicesRegistry(),
    new CommonRegistry(),
    new StartupRegistry(),
];

export { registries, types };
