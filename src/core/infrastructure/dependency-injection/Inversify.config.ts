// import section [console_app_comment]
import { Container } from "inversify";
import { IRegistry } from "./IRegistry";

export class CoreRegistry implements IRegistry {
    public register(container: Container): Container {
        return container;
    }
}
