import {DollarSign} from "xpresser/types";
export {DBCollection, XMongoConnection, UseCollection} from "./util";


export async function run(config: any, $: DollarSign): Promise<void> {

    // Require Connector
    const ConnectToMongodb = require('./lib/ConnectToMongodb') as typeof import("./lib/ConnectToMongodb");

    // Connect
    await ConnectToMongodb($);

    /**
     * Set artisan factory settings
     */
    $.ifIsConsole(() => {
        const useStrictTypescriptModels = $.config.get('useStrictTypescriptModels', false);

        $.config.set(
            'artisan.factory.model',
            useStrictTypescriptModels
                ? `${config.path}/Factory/model.strict.hbs`
                : `${config.path}/Factory/model.hbs`
        );
    })
}

