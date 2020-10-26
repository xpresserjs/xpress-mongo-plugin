import {XMongoConnection} from "../util";
import {DollarSign} from "xpresser/types";
declare const $: DollarSign;

/**
 * Connect to database on boot
 */
export = async (): Promise<any> => {
    // Get mongodb config
    let config = $.$config.get('mongodb', {});

    if (typeof config === "function") {
        config = $.$config.call('mongodb');
    }


    try {
        // try connecting...
        const client = await XMongoConnection.connect();
        // use database after connection.
        client.useDb(config.database);

        // Log success if not console.
        $.ifNotConsole(() => $.logSuccess('Connected to MongoDB'))
    } catch (err) {
        // Console.log Error
        console.log(err);
        // Exit
        $.logErrorAndExit("Error connecting to mongodb!")
    }
};