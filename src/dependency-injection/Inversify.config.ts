// import section [console_app_comment]
import { Container } from "inversify";
import { IRegistry } from "../core/infrastructure/dependency-injection/IRegistry";
export class CommonRegistry implements IRegistry {
    public register(container: Container): Container {
        // repo definitions [console_app_comment]
        // variable bindings [console_app_comment]
        // actions [console_app_comment]
        return container;
    }
}
