import { Controller } from "hapi-controllers";
import { kernel, Types } from "../../infrastructure/dependency-injection";
import { IAction, ActionContext } from "../../../actions";
import { Request } from "hapi";
import "automapper-ts";
import { Parser } from "../../utility/Parser";

export class BaseController extends Controller {

    protected getAppllicationUser(request: Request): string {
        return request.auth && request.auth.credentials ? request.auth.credentials.userId : null;
    }

    protected async executeAction<TOut>(actionAlias: string, request: Request, params?: any): Promise<TOut> {
        const action: IAction = kernel.getNamed<IAction>(Types.IAction, actionAlias);
        const context: ActionContext = new ActionContext();
        context.userId = this.getAppllicationUser(request);
        context.query = this.getQuery(request);
        context.params = params ? params : {};
        return await action.run(context);
    }

    protected map(sourceModel: string, destModel: string, data: any) {
        return automapper.map(sourceModel, destModel, data);
    }

    protected getQuery(request: Request): any {
        const parser = new Parser();
        const query = request.query;
        if (!query) {
            return null;
        }
        const mongoQuery = parser.mongodb(query);
        if (query._end && mongoQuery.limitInfo) {
            mongoQuery.limitInfo.limit = query._end;
        }
        return mongoQuery;
    }
}
