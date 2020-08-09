import {IApplicationException} from "./ApplicationException";

export class RepositoryLayerException extends Error implements IApplicationException  {
    public name: string;
    public message: string;
    public data: string;

    constructor(message: string, data?: any) {
        super("REPOSITORY_LAYER_EXCEPTION");
        this.name = "REPOSITORY_LAYER_EXCEPTION";
        this.message = message;
        this.data = data;
    }
}
