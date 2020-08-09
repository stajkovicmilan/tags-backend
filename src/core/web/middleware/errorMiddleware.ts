import * as Hapi from "hapi";
import * as Boom from "boom";
import * as errors from "../../infrastructure/exceptions";

export default (server: Hapi.Server) => {

    server.ext("onPreResponse", (request, h) => {
        const response = request.response;
        if (!response.isBoom) {
            return h.continue;
        }

        let boom;

        if (response instanceof errors.OperationNotPermited || response instanceof errors.UseOperationNotAllowed) {
            boom = Boom.badRequest(response.name, response.data);
        } else if (response instanceof errors.InvalidCredentialsException ||
            response instanceof errors.UserNotAuthorizedException ||
            (response.message && response.message === "Bad token") ||
            (response.message && response.message === "Missing authentication")) {
            boom = Boom.unauthorized(response.message);
        } else if (response instanceof errors.EntityNotFoundException || response instanceof errors.InvalidCredentialsException) {
            boom = Boom.notFound(response.message);
        } else if (response instanceof errors.EntityAlreadyExist ||
            response instanceof errors.UserAlreadyExist ||
            response instanceof errors.UsernameNotAvailableException ||
            response instanceof errors.ValidationException ||
            response instanceof Error) {
            const r = (response as any);
            boom = Boom.badRequest(r.message, r.data || r.name);
        } else if (response instanceof errors.ArgumentNullException ||
            response instanceof errors.ProviderLayerException ||
            response instanceof errors.ServiceLayerException ||
            response instanceof errors.RepositoryLayerException) {
            boom = Boom.internal(response.message);
        } else {
            boom = Boom.badRequest(response.name, response.data);
            console.log(response);
            console.log(boom);
            // return h.continue;
        }
        if (boom.data) {
            boom.output.payload.data = boom.data;
        }
        console.log(boom);
        return boom;
    });
};
