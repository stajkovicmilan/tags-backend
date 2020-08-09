import Types from "../../dependency-injection/Types";
import { ActionBase } from "../ActionBase";
import * as Exceptions from "../../core/infrastructure/exceptions";
import * as Services from "../../services";
import * as Entities from "../../entities";
import { injectable, inject } from "inversify";
import * as Password from "../../core/utility/Password";
import * as Joi from "joi";

@injectable()
export class RegisterUser extends ActionBase<Entities.IUser> {

  public static alias = "RegisterUser";

  public static constraints = {
    ...Entities.UserConstraints,
    password: Joi.string().required(),
  };

  constructor(
    @inject(Types.IUserService) private userService: Services.IUserService,
  ) {
    super();
  }

  public async execute(context): Promise<Entities.IUser> {
    const userEmail = context.params.email.toLowerCase();

    let user: Entities.IUser = {
      id: null,
      username: context.params.username ? context.params.username : userEmail,
      email: userEmail,
      password: await Password.generateHash(context.params.password),
      firstName: context.params.firstName,
      lastName: context.params.lastName,
    };
    user = await this.userService.register(user);
    if (!user) {
      throw new Exceptions.EntityNotFoundException("User", userEmail, "User register error!");
    }
    return user;
  }

  protected getConstraints(): any {
    return RegisterUser.constraints;
  }
}
