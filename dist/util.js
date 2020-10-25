"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCollection = exports.parseServerUrl = exports.is = exports.XMongoModel = exports.XMongoConnection = void 0;
const xpress_mongo_1 = require("xpress-mongo");
Object.defineProperty(exports, "XMongoModel", { enumerable: true, get: function () { return xpress_mongo_1.XMongoModel; } });
Object.defineProperty(exports, "is", { enumerable: true, get: function () { return xpress_mongo_1.is; } });
Object.defineProperty(exports, "parseServerUrl", { enumerable: true, get: function () { return xpress_mongo_1.parseServerUrl; } });
// Get mongodb config
let config = $.$config.get('mongodb');
// if config is function call and get value
if (typeof config === "function") {
    config = $.$config.call('mongodb');
}
// Throw Error if !config
if (!config)
    throw Error('mongodb config not found!');
// Get Connection Instance
const XMongoConnection = xpress_mongo_1.Client(config.url, config.options);
exports.XMongoConnection = XMongoConnection;
// Create ShortHand function for model creation
const DBCollection = (collection) => XMongoConnection.model(collection);
exports.DBCollection = DBCollection;
