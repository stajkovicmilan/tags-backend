import { injectable, inject } from "inversify";

import * as Repos from "../repositories";
import { BaseRepository } from "./BaseRepository";
import { IUser } from "../../entities";

@injectable()
export class User extends BaseRepository<IUser> implements Repos.IUserRepository {

    constructor(@inject("entityName") entityName: string) {
        super(entityName);
    }

    public async create(data: IUser): Promise<IUser> {
        return super.create(data);
    }

    public async find(query: any): Promise<IUser[]> {
        return super.find(query);
    }

    public async findAndSort(query: any, sort: any, skip: any): Promise<IUser[]> {
        query.active = true;
        return super.findAndSort(query, sort, skip);
    }

    public async findOne(query: any): Promise<IUser> {
        return super.findOne(query);
    }

    public async findAll(): Promise<IUser[]> {
        return super.find({});
    }

    public async count(query: any): Promise<number> {
        return super.count(query);
    }
}
