import { ILink } from "../entities";

export interface ILinkService {
    addLinkForUser(link: ILink): Promise<ILink>;
    deleteLinkForUser(link: ILink): Promise<boolean>;
    getLinksForuser(userId: string): Promise<ILink[]>;
    getLinkById(id: string): Promise<ILink>;
}
