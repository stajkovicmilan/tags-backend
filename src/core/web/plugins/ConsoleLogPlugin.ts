import * as Good from "good";

export default {
    plugin: Good,
    options: {
        reporters: {
            console: [{
                module: "good-console",
            }, "stdout"],
        },
    },
};
