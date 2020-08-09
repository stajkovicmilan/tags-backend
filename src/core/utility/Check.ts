import { ArgumentNullException } from "../infrastructure/exceptions/ArgumentNullException";
import { EntityNotFoundException, EntityAlreadyExist } from "../infrastructure/exceptions";

export class Check {
    public static notNull(param: any, paramName: string) {

        if (!param) {
            throw new ArgumentNullException(paramName);
        }
    }

    public static entityExists(entity: any, entityName: string, entityIdentifier: any) {
        if (!entity) {
            throw new EntityNotFoundException(entityName, entityIdentifier);
        }
    }

    public static entityAlreadyExists(entity: any, entityName: string, entityIdentifier: any) {
        if (entity) {
            throw new EntityAlreadyExist(entityName, entityIdentifier);
        }
    }
}
