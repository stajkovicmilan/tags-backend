// import section [console_app_comment]
import { Container } from "inversify";
import { Types } from "../core/infrastructure/dependency-injection";
import { IAction } from "../actions";
import { IRegistry } from "../core/infrastructure/dependency-injection";
import * as userActions from "../actions/users";
import * as linkActions from "../actions/links";

export class ActionsRegistry implements IRegistry {
    public register(container: Container): Container {
        // actions [console_app_comment]
        container.bind<IAction>(Types.IAction).to(userActions.RegisterUser).whenTargetNamed(userActions.RegisterUser.alias);
        container.bind<IAction>(Types.IAction).to(userActions.LoginUser).whenTargetNamed(userActions.LoginUser.alias);

        container.bind<IAction>(Types.IAction).to(linkActions.AddLinkByUser).whenTargetNamed(linkActions.AddLinkByUser.alias);
        container.bind<IAction>(Types.IAction).to(linkActions.GetAllUserLinks).whenTargetNamed(linkActions.GetAllUserLinks.alias);
        return container;
    }
}
