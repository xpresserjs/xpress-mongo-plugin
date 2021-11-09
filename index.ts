import { DollarSign, PluginData } from "xpresser/types";

export function dependsOn(plugin: PluginData) {
    return ["xpress-mongo"];
}

export async function run(plugin: PluginData, $: DollarSign): Promise<void> {
    /**
     * Skip connecting to db when running native xpresser commands
     */
    if (!$.isNativeCliCommand()) {
        // Require Connector
        const ConnectToMongodb =
            require("./lib/ConnectToMongodb") as typeof import("./lib/ConnectToMongodb");

        // Connect
        await ConnectToMongodb($);
    }

    /**
     * Set xjs factory settings
     */
    $.ifIsConsole(() => {
        const useStrictTypescriptModels = $.config.get("useStrictTypescriptModels", false);

        $.config.set(
            "artisan.factory.model",
            useStrictTypescriptModels
                ? `${plugin.path}/Factory/model.strict.hbs`
                : `${plugin.path}/Factory/model.hbs`
        );
    });
}

export { DBCollection, XMongoConnection, UseCollection } from "./util";
