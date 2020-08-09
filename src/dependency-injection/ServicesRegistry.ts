// import section [console_app_comment]
import { Container } from "inversify";
import Types from "./Types";
import * as Services from "../services";
import { IRegistry } from "../core/infrastructure/dependency-injection";

export class ServicesRegistry implements IRegistry {
    public register(container: Container): Container {
        container.bind<Services.IUserService>(Types.IUserService).to(Services.UserService);
        container.bind<Services.ILinkService>(Types.ILinksService).to(Services.LinkService);
        return container;
    }
}
