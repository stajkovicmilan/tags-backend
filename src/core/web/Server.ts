import * as Hapi from "hapi";
import * as AuthBearer from "hapi-auth-bearer-token";
import * as plugins from "./plugins/";
import { auth, errorHandler } from "./middleware/";
import loadControllers from "../../web/controllers";

export class Server {
    private server: Hapi.Server;

    public async listen(port: number) {
        this.server = new Hapi.Server({
            port: port,
            routes: {
                cors: true,
                validate: {
                    failAction: async (request, h, err) => {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    },
                },
            },
        });

        await this.server.register(AuthBearer);

        this.server.auth.strategy("simple", "bearer-access-token", {
            validate: auth,
        });

        errorHandler(this.server);
        loadControllers(this.server);

        await this.server.register(plugins);

        this.server.start((err) => {
            if (!err) {
                console.log("Server Started.");
            }
        });

        return this.server.listener;
    }
}
