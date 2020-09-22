const {Client, XMongoModel, is, parseServerUrl} = require('xpress-mongo')
const config = $.$config.get('mongodb');

if(!config)
    throw Error('mongodb config not found!');

const XMongoConnection = Client(config.url, config.options);

exports.DBCollection = (collection) => {
    return class extends XMongoModel {
        static thisCollection() {
            return XMongoConnection.collection(collection)
        }
    }
}

exports.XMongoConnection = XMongoConnection;
exports.XMongoModel = XMongoModel;
exports.is = is;
exports.parseServerUrl = parseServerUrl;