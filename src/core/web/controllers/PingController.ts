import { Route } from "hapi-controllers";
import { BaseController } from "./BaseController";
import QRCode = require("qrcode");

export class PingController extends BaseController {

    @Route({
        method: "GET",
        path: "/ping",
        config: {
            auth: false,
            description: "Ping web service",
            notes: "Returns Pong",
            tags: ["api", "ping"],
            validate: {},
        },
    })
    public async ping(r, h) {
        return h.response("Pong").code(302).header("Location", "https://google.com");
    }
}
