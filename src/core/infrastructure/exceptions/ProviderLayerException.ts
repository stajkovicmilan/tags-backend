import {IApplicationException} from "./ApplicationException";

export class ProviderLayerException extends Error implements IApplicationException  {
    public name: string;
    public message: string;
    public data: string;

    constructor(message: string, data?: any) {
        super("PROVIDER_LAYER_EXCEPTION");
        this.name = "PROVIDER_LAYER_EXCEPTION";
        this.message = message;
        this.data = data;
    }
}
