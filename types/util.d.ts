import { XMongoModel } from "xpress-mongo";
export declare const XMongoConnection: import("xpress-mongo/src/XMongoClient");
export declare const DBCollection: (collection: string) => typeof XMongoModel;
export { Client, XMongoModel, is, parseServerUrl } from "xpress-mongo";
