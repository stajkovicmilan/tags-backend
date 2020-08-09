// import new controller [console_app_comment]
// import { TagsController } from "./TagsController";
import * as CoreControllers from "../../core/web/controllers";
import * as Hapi from "hapi";
import { registerController } from "hapi-controllers";
import { UserController } from "./UserController";
import { LinksController } from "./LinksController";

export default (server: Hapi.Server) => {
    registerController(server, LinksController, () => new LinksController());
    registerController(server, UserController, () => new UserController());
    registerController(server, CoreControllers.PingController, () => new CoreControllers.PingController());
};
