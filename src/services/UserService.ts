import { IUserService } from "./IUserService";
import { IUserRepository } from "../core/repositories";
import { Check } from "../core/utility";
import { injectable, inject } from "inversify";
import { ServiceLayerException, EntityAlreadyExist } from "../core/infrastructure/exceptions";
import Types from "../dependency-injection/Types";
import * as jwt from "jwt-simple";
import * as config from "config";
import { IUser } from "../entities";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(Types.IUserRepository) private userRepo: IUserRepository) {
  }

  public async register(user: IUser): Promise<IUser> {
    Check.notNull(user, "user");

    const existingUser: IUser = await this.userRepo.findOne({ email: user.email });
    if (existingUser) {
      if (existingUser.password) {
        throw new EntityAlreadyExist("User", `User with email ${user.email} already exists`);
      }
      await this.userRepo.delete(existingUser);
    }

    try {
      let newUser = await this.userRepo.create(user);
      newUser = this.encodeToken(newUser);
      newUser = await this.userRepo.update(user);
      return newUser;
    } catch (err) {
      throw new ServiceLayerException(err.toString());
    }
  }

  public async delete(user: IUser): Promise<boolean> {
    Check.notNull(user, "user");

    return await this.userRepo.delete(user);
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user: IUser = await this.userRepo.findOne({ id: userId });
    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    const user: IUser = await this.userRepo.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user;
  }

  private encodeToken(user: IUser): IUser {
    const secret: string = String(config.get("secret"));
    user.token = jwt.encode({ authUserId: user.id }, secret);
    return user;
  }

}
