import { init } from "xpresser";

const $ = init({
    name: "@xpresser/xpress-mongo",
    env: "development",
    paths: {
        base: __dirname
    },

    /**
     * If Enabled, xjs make:model will generate Models
     * that requires you to define all data types.
     */
    useStrictTypescriptModels: false, // >=v1.0.0

    // Connection Config
    mongodb: {
        url: "mongodb://127.0.0.1:27017",
        database: "test",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
});

$.boot();
