import * as HapiSwagger from "hapi-swagger";
import * as config from "config";

const scheme = config.get<string>("env") === "development" ? "http" : "https";

export default {
    plugin: HapiSwagger,
    options: {
        grouping: "tags",
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
        info: {
            title: "links app",
            version: "1.0",
        },
        pathPrefixSize: 4,
        schemes: [scheme],
    },
};
