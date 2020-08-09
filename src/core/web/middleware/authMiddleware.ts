import * as config from "config";
import * as jwt from "jwt-simple";

const secret: string = String(config.get("secret"));

export default async (request, token, h) => {
    try {
        const decodedToken = jwt.decode(token, secret);
        return {
            credentials: {
                userId: decodedToken.authUserId,
            },
            isValid: true,
        };
    } catch (err) {
        return {
            credentials: null,
            isValid: false,
        };
    }
};
