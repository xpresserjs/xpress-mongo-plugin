"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const util_1 = require("../util");
module.exports = (next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get mongodb config
    let config = $.$config.get('mongodb', {});
    if (typeof config === "function") {
        config = $.$config.call('mongodb');
    }
    try {
        // try connecting...
        const client = yield util_1.XMongoConnection.connect();
        // use database after connection.
        client.useDb(config.database);
        // Log success if not console.
        $.ifNotConsole(() => $.logSuccess('Connected to MongoDB'));
    }
    catch (err) {
        // Console.log Error
        console.log(err);
        // Exit
        $.logErrorAndExit("Error connecting to mongodb!");
    }
    return next();
});
