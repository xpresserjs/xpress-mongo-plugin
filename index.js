module.exports = {
    run(config) {

        // Connect to db on boot
        $.on.boot([
            next => require('./lib/ConnectToMongodb')(next),
        ]);

        /**
         * Set artisan factory settings
         */
        $.ifIsConsole(() => {
            $.$config.set('artisan.factory.model', `${config.path}/Factory/model.hbs`);
        })
    }
};