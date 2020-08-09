import * as Repos from "../../repositories";
import * as Entities from "../../entities";
import { injectable, inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

@injectable()
export class Links extends BaseRepository<Entities.ILink> implements Repos.ILinksRepository {

    constructor(@inject("entityName") entityName: string) {
        super(entityName);
    }
}
