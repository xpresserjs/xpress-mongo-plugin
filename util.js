const {Client, XMongoModel, is, parseServerUrl} = require('xpress-mongo')
// Get mongodb config
let config = $.$config.get('mongodb');

if (typeof config === "function") {
    config = $.$config.call('mongodb');
}

if (!config)
    throw Error('mongodb config not found!');

const XMongoConnection = Client(config.url, config.options);

exports.XMongoConnection = XMongoConnection;
exports.XMongoModel = XMongoModel;
exports.is = is;
exports.parseServerUrl = parseServerUrl;
exports.DBCollection = (collection) => XMongoConnection.model(collection);
