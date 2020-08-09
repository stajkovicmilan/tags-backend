// import section [console_app_comment]
import { Container } from "inversify";
import Types from "./Types";
import * as Repositories from "../core/repositories";
import * as DB from "../core/database";
import { IRegistry } from "../core/infrastructure/dependency-injection";

export class RepositoryRegistry implements IRegistry {
    public register(container: Container): Container {
        // repo definitions [console_app_comment]
        container.bind<Repositories.IUserRepository>(Types.IUserRepository).to(DB.User);
        container.bind<Repositories.ILinksRepository>(Types.ILinksRepository).to(DB.Links);

        // variable bindings [console_app_comment]
        container.bind<string>("entityName").toConstantValue("users").whenInjectedInto(DB.User);
        container.bind<string>("entityName").toConstantValue("links").whenInjectedInto(DB.Links);
        return container;
    }
}
