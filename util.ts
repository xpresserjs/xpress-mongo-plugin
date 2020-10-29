import {Client, XMongoModel, is, parseServerUrl} from "xpress-mongo"
import {DollarSign} from "xpresser/types";

declare const $: DollarSign;

// Get mongodb config
let config = $.config.get('mongodb');

// if config is function call and get value
if (typeof config === "function") {
    config = $.config.call('mongodb');
}

// Throw Error if !config
if (!config)
    throw Error('mongodb config not found!');

// Get Connection Instance
const XMongoConnection = Client(config.url, config.options);

// Create ShortHand function for model creation
const DBCollection = (collection: string): typeof XMongoModel => XMongoConnection.model(collection);

// Export Others
export = {XMongoConnection, XMongoModel, is, parseServerUrl, DBCollection};
