import { InvalidTokenException } from "./InvalidTokenException";

export * from "./ApplicationException";
export * from "./ValidationException";
export * from "./InvalidCredentialsException";
export * from "./EntityNotFoundException";
export * from "./UsernameNotAvailableException";
export * from "./UserNotAuthorizedException";
export * from "./ArgumentNullException";
export * from "./ServiceLayerException";
export * from "./RepositoryLayerException";
export * from "./UserAlreadyExist";
export * from "./UseOperationNotAllowed";
export * from "./EntityAlreadyExist";
export * from "./OperationNotPermited";
export * from "./ProviderLayerException";
export * from "./InvalidTokenException";
export class ExceptionTypes {
    public static ValidationException: string = "ValidationException";
    public static InvalidCredentialsException: string = "InvalidCredentialsException";
    public static EntityNotFoundException: string = "EntityNotFoundException";
    public static UserAlreadyExist: string = "UserAlreadyExist";
    public static UseOperationNotAllowed: string = "UseOperationNotAllowed";
    public static UsernameNotAvailableException: string = "UsernameNotAvailableException";
    public static UserNotAuthorizedException: string = "UserNotAuthorizedException";
    public static ArgumentNullException: string = "ArgumentNullException";
    public static ServiceLayerException: string = "ServiceLayerException";
    public static RepositoryLayerException: string = "RepositoryLayerException";
    public static ProviderLayerException: string = "ProviderLayerException";
    public static EntityAlreadyExist: string = "EntityAlreadyExist";
    public static OperationNotPermited: string = "OperationNotPermited";
    public static InvalidTokenException: string = "InvalidTokenException";
}
