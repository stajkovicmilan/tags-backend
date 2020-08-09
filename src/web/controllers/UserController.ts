import { Route } from "hapi-controllers";
import { BaseController } from "../../core/web/controllers";
import { Request } from "hapi";
import {
    RegisterUser,
    LoginUser,
} from "../../actions/users/";
import { IUser } from "../../entities";

export class UserController extends BaseController {

    @Route({
        method: "POST",
        path: "/register-user",
        config: {
            auth: false,
            description: "Register User",
            notes: "Returns User",
            tags: ["api", "User"],
            validate: {
                payload: RegisterUser.constraints,
            },
        },
    })
    public async registerUser(request: Request) {
        return await this.executeAction<IUser>(RegisterUser.alias, request, request.payload);
    }

    @Route({
        method: "POST",
        path: "/login-user",
        config: {
            auth: false,
            description: "Login User",
            notes: "Returns boolean",
            tags: ["api", "User"],
            validate: {
                payload: LoginUser.constraints,
            },
        },
    })
    public async loginUser(request: Request) {
        return await this.executeAction<IUser>(LoginUser.alias, request, request.payload);
    }
}
