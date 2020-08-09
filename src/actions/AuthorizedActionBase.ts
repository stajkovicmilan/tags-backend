import { ActionContext, ActionBase } from "./ActionBase";
import { injectable} from "inversify";
import * as Repositories from "../repositories";
import { Types, kernel } from "../core/infrastructure/dependency-injection/";
import * as Entities from "../entities";
import * as Exceptions from "../core/infrastructure/exceptions/";
import { IUser } from "../entities";

@injectable()
export abstract class AuthorizedActionBase<T> extends ActionBase<T> {

  protected commiterUser: IUser;

  constructor() {
    super();
  }

  protected async onActionExecuting(context: ActionContext): Promise<ActionContext> {
    if (!context.userId) {
      throw new Exceptions.OperationNotPermited(this.constructor.name);
    }

    const userRepo = kernel.get<Repositories.IUserRepository>(Types.IUserRepository);

    const user: Entities.IUser = await userRepo.findOne({ id: context.userId });

    if (!user) {
      throw new Exceptions.UserNotAuthorizedException(context.userId, this.constructor.name);
    }

    const allowedRoles = this.getRoles();

    this.commiterUser = user;

    return context;
  }

  protected getRoles(): string[] {
    return [];
  }
}
