import { XMongoModel, is, parseServerUrl } from "xpress-mongo";
declare const XMongoConnection: import("xpress-mongo/types/src/XMongoClient");
declare const DBCollection: (collection: string) => typeof XMongoModel;
export { XMongoConnection, XMongoModel, is, parseServerUrl, DBCollection };
