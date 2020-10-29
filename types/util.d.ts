import { XMongoModel, parseServerUrl } from "xpress-mongo";
declare const _default: {
    XMongoConnection: import("xpress-mongo/types/src/XMongoClient");
    XMongoModel: typeof XMongoModel;
    is: import("xpress-mongo").XMongoSchemaBuilder;
    parseServerUrl: typeof parseServerUrl;
    DBCollection: (collection: string) => typeof XMongoModel;
};
export = _default;
