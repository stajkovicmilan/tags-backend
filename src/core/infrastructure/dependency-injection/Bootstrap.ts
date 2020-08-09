import { Container } from "inversify";
import * as di from "../../../dependency-injection";
import { CoreRegistry } from "./Inversify.config";
import { IRegistry } from "./IRegistry";

export class Bootstrap {
    public static Kernel: Container;

    public static initialize(): Container {
        if (!Bootstrap.Kernel) {
            Bootstrap.Kernel = new Container();
            const coreRegistry = new CoreRegistry();
            Bootstrap.Kernel = coreRegistry.register(Bootstrap.Kernel);
            const registries: IRegistry[] = di.registries;

            for (let i = 0; i < registries.length; i++) {
                Bootstrap.Kernel = registries[i].register(Bootstrap.Kernel);
            }
        }
        return Bootstrap.Kernel;
    }
}
