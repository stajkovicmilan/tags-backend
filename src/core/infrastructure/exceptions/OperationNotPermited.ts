import {IApplicationException} from "./ApplicationException";

export class OperationNotPermited extends Error implements IApplicationException {
    public static MAXIMUM_NUMBER_OF_EMPLOYEES_REACHED = "MAXIMUM_NUMBER_OF_EMPLOYEES_REACHED";
    public static MAXIMUM_NUMBER_OF_SESSIONS_PER_MONTH_REACHED = "MAXIMUM_NUMBER_OF_SESSIONS_PER_MONTH_REACHED";
    public name: string;
    public message: string;
    public data: string;

    constructor(name, message?, data?) {
        super("OperationNotPermited");
        this.name = name;
        this.message = message ? message : `Operation ${name} is not permited`;
        this.data = data;
    }
}
