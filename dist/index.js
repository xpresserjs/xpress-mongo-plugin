"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCollection = exports.run = void 0;
function run(config) {
    // Connect to db on boot
    $.on.boot([
        next => require('./lib/ConnectToMongodb')(next),
    ]);
    /**
     * Set artisan factory settings
     */
    $.ifIsConsole(() => {
        $.$config.set('artisan.factory.model', `${config.path}/Factory/model.hbs`);
    });
}
exports.run = run;
var util_1 = require("./util");
Object.defineProperty(exports, "DBCollection", { enumerable: true, get: function () { return util_1.DBCollection; } });
