import { types } from "../../dependency-injection/";
import { ActionContext } from "../ActionBase";
import * as Entities from "../../entities/";
import { injectable, inject } from "inversify";
import { AuthorizedActionBase } from "../AuthorizedActionBase";
import { ServiceLayerException } from "../../core/infrastructure/exceptions";
import { ILink} from "../../entities/";
import { ILinkService } from "../../services";

@injectable()
export class GetAllUserLinks extends AuthorizedActionBase<ILink[]> {

    public static constraints = {};

    public static alias = "GetLinks";

    constructor(@inject(types.ILinksService) private linkService: ILinkService) {
        super();
    };

    public async execute(context: ActionContext): Promise<ILink[]> {

        let links: Entities.ILink[];
        try {
            links = await this.linkService.getLinksForuser(this.commiterUser.id);
        } catch (err) {
            throw new ServiceLayerException("Failed to create link", err);
        }

        return links;
    }

    protected getConstraints(): any {
        return GetAllUserLinks.constraints;
    }
}
