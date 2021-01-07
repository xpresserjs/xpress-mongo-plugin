import {getInstance} from "xpresser";
export {DBCollection, XMongoConnection} from "./util";

const $ = getInstance();

export async function run(config: any): Promise<void> {

    // Require Connector
    const ConnectToMongodb = require('./lib/ConnectToMongodb');
    // Connect
    await ConnectToMongodb();

    /**
     * Set artisan factory settings
     */
    $.ifIsConsole(() => {
        $.config.set('artisan.factory.model', `${config.path}/Factory/model.hbs`);
    })
}

