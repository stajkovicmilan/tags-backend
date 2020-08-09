import { IUser } from "../../entities/";

export interface IUserRepository {
  find(query: any): Promise<IUser[]>;
  findOne(query: any): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findAndSort(query: any, sort: any, skip: any): Promise<IUser[]>;
  create(data: IUser): Promise<IUser>;
  update(data: IUser): Promise<IUser>;
  delete(data: IUser): Promise<boolean>;
  count(query: any): Promise<number>;
}
