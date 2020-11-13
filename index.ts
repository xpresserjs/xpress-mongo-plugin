import {getInstance} from "xpresser";
import Util = require('./util');
export const {DBCollection} = Util

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

