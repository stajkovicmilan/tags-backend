import { Types } from "../core/infrastructure/dependency-injection";
export default {
    // types definitions [console_app_comment]
    IUserRepository: Symbol("IUserRepository"),
    ILinksRepository: Symbol("ILinksRepository"),

    IUserService: Symbol("IUserService"),
    ILinksService: Symbol("ILinksService"),

    ...Types,
};
