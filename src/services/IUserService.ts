import { IUser } from "../entities";

export interface IUserService {
    register(user: IUser): Promise<IUser>;
    delete(user: IUser): Promise<boolean>;
    getUserById(userId: string): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser>;
}
