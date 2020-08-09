import * as Entities from "../../entities";

export interface ILinksRepository {
    create(link: Entities.ILink): Promise<Entities.ILink>;
    delete(link: Entities.ILink): Promise<boolean>;
    update(link: Entities.ILink): Promise<Entities.ILink>;
    find(query: any): Promise<Entities.ILink[]>;
    findOne(query: any): Promise<Entities.ILink>;
    findAll(): Promise<Entities.ILink[]>;
}
