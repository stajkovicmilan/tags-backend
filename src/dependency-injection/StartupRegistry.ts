// import section [console_app_comment]
import { Container } from "inversify";
import { IRegistry } from "../core/infrastructure/dependency-injection";

export class StartupRegistry implements IRegistry {
    public register(container: Container): Container {
        return container;
    }
}
