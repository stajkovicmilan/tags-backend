import { Route } from "hapi-controllers";
import { BaseController } from "../../core/web/controllers";
import { Request } from "hapi";
import { AddLinkByUser, GetAllUserLinks } from "../../actions/links";
import { ILink } from "../../entities";

export class LinksController extends BaseController {

    @Route({
        method: "POST",
        path: "/links",
        config: {
            auth: "simple",
            description: "Create Link",
            notes: "Returns new Link",
            tags: ["api", "Link"],
            validate: {
                payload: AddLinkByUser.constraints,
            },
        },
    })
    public async addLinkByUser(request: Request) {
        const params = request.payload;
        return await this.executeAction<ILink>(AddLinkByUser.alias, request, params);
    }

    @Route({
        method: "GET",
        path: "/links",
        config: {
            auth: "simple",
            description: "Reurn User Links",
            notes: "Returns user Links",
            tags: ["api", "Link"],
        },
    })
    public async getLinksForUser(request: Request) {
        return await this.executeAction<ILink[]>(GetAllUserLinks.alias, request, request.query);
    }
}
