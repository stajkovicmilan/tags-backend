import { types } from "../../dependency-injection/";
import { ActionContext } from "../ActionBase";
import * as Entities from "../../entities/";
import { injectable, inject } from "inversify";
import { AuthorizedActionBase } from "../AuthorizedActionBase";
import { ServiceLayerException } from "../../core/infrastructure/exceptions";
import { ILink, ILinkConstraints } from "../../entities/";
import { ILinkService } from "../../services";

@injectable()
export class AddLinkByUser extends AuthorizedActionBase<ILink> {

    public static constraints = ILinkConstraints;

    public static alias = "AddLink";

    constructor(@inject(types.ILinksService) private linkService: ILinkService) {
        super();
    };

    public async execute(context: ActionContext): Promise<ILink> {

        let link: Entities.ILink = {
            url: context.params.url,
            userId: this.commiterUser.id,
            tags: context.params.tags,
        };

        try {
            link = await this.linkService.addLinkForUser(link);
        } catch (err) {
            throw new ServiceLayerException("Failed to create link", err);
        }

        return link;
    }

    protected getConstraints(): any {
        return AddLinkByUser.constraints;
    }
}
