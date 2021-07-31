import Util = require("../util");
import {DollarSign} from "xpresser/types";
const {XMongoConnection} = Util;

/**
 * Connect to database on boot
 */
export = async ($: DollarSign): Promise<any> => {
    // Get mongodb config
    let config = $.config.get('mongodb', {});

    if (typeof config === "function") {
        config = $.config.call('mongodb');
    }
    
    try {
        // try connecting...
        const client = await XMongoConnection.connect();
        // use database after connection.
        client.useDb(config.database);

        // Log success if not console.
        if(!$.options.isConsole || $.engineData.has("isEventServer")) {
            $.logSuccess(`Connected to MongoDB: [${config.database}]`)
        }
    } catch (err) {
        // Console.log Error
        console.log(err);
        // Exit
        $.logErrorAndExit("Error connecting to mongodb!")
    }
};