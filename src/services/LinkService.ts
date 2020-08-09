import { ILinksRepository } from "../core/repositories";
import { injectable, inject } from "inversify";
import { ServiceLayerException } from "../core/infrastructure/exceptions";
import Types from "../dependency-injection/Types";
import { ILink } from "../entities";
import { ILinkService } from ".";

@injectable()
export class LinkService implements ILinkService {

  constructor(
    @inject(Types.ILinksRepository) private linkRepo: ILinksRepository) {
  }

  public async addLinkForUser(link: ILink): Promise<ILink> {
    try {
      return this.linkRepo.create(link);
    } catch (err) {
      throw new ServiceLayerException(err.toString());
    }
  }
  public async deleteLinkForUser(link: ILink): Promise<boolean> {
    try {
      return this.linkRepo.delete(link);
    } catch (err) {
      throw new ServiceLayerException(err.toString());
    }
  }
  public async getLinksForuser(userId: string): Promise<ILink[]> {
    try {
      return this.linkRepo.find({userId});
    } catch (err) {
      throw new ServiceLayerException(err.toString());
    }
  }
  public async getLinkById(id: string): Promise<ILink> {
    try {
      return this.linkRepo.findOne({id});
    } catch (err) {
      throw new ServiceLayerException(err.toString());
    }
  }

}
