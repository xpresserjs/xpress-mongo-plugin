import {Client, XMongoModel, is, parseServerUrl} from "xpress-mongo"
import {getInstance} from "xpresser";

const $ = getInstance();

// Get mongodb config
let config = $.config.get('mongodb');

// if config is function call and get value
if (typeof config === "function") {
    config = $.config.call('mongodb');
}

// Throw Error if !config
if (!config)
    $.logErrorAndExit('{mongodb} config not found!');

// Get Connection Instance
export const XMongoConnection = Client(config.url, config.options);

// Create ShortHand function for model creation
export const DBCollection = (collection: string): typeof XMongoModel => XMongoConnection.model(collection);
export {Client, XMongoModel, is, parseServerUrl} from "xpress-mongo"
