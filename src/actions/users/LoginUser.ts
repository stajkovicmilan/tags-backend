import Types from "../../dependency-injection/Types";
import { ActionBase } from "../ActionBase";
import * as Exceptions from "../../core/infrastructure/exceptions";
import * as Services from "../../services";
import * as Entities from "../../entities";
import { injectable, inject } from "inversify";
import * as Password from "../../core/utility/Password";
import * as Joi from "joi";

@injectable()
export class LoginUser extends ActionBase<Entities.IUser> {

    public static alias = "LoginUser";

    public static constraints = {
        password: Joi.string().required(),
        email: Joi.string().required(),
    };

    constructor(
        @inject(Types.IUserService) private userService: Services.IUserService,
    ) {
        super();
    }

    public async execute(context): Promise<Entities.IUser> {
        const userEmail = context.params.email.toLowerCase();

        const user: Entities.IUser = await this.userService.getUserByEmail(userEmail);
        if (!user) {
            throw new Exceptions.EntityNotFoundException("User", userEmail, "User not found!");
        }
        const passwordValid: boolean = await Password.comparePassword(context.params.password, user.password);
        if (!passwordValid) {
            throw new Exceptions.EntityNotFoundException("UserPassword", context.params.password, "User incorect passeord!");
        }
        delete user.password;
        return user;
    }

    protected getConstraints(): any {
        return LoginUser.constraints;
    }
}
