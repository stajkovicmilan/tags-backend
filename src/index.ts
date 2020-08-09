import "reflect-metadata";
import { DB } from "./core/database";
import { Server } from "./core/web/Server";
import * as Moment from "moment";

const port: number = parseInt(process.env.PORT, 10) || 8080;
console.log(port);
console.log(`Listen ${port}`);
DB.init()
    .then(() => {
        // Initialize WebServer
        const server: Server = new Server();
        const listener = server.listen(port);

        const m = Moment();
        console.log("Server started at: ", m);
        console.log(`Server started at: ${m.hours()}:${m.minutes()}`);
    });
