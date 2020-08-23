const {XMongoConnection} = require('../util');
module.exports = (next) => {
    const config = $.$config.get('mongodb', {});

    XMongoConnection.connect()
        .then(client => {
            $.ifNotConsole(() => $.logSuccess('Connected to MongoDB'))

            client.useDb(config.database);

            return next()
        })
        .catch(err => {
            console.log(err);
            $.logErrorAndExit("Error connecting to mongodb!")
        });
};