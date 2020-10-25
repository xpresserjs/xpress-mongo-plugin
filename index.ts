import {DollarSign} from "xpresser/types";

declare const $: DollarSign;

export function run(config: any): void {
    // Connect to db on boot
    $.on.boot([
        next => require('./lib/ConnectToMongodb')(next),
    ]);

    /**
     * Set artisan factory settings
     */
    $.ifIsConsole(() => {
        $.$config.set('artisan.factory.model', `${config.path}/Factory/model.hbs`);
    })
}

export {DBCollection} from "./util"
