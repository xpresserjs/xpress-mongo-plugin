const {XMongoConnection} = require('../util');

/**
 * Connect to database on boot
 * @param next
 * @return {Promise<*>}
 */
module.exports = async (next) => {
    // Get mongodb config
    const config = $.$config.get('mongodb', {});

    try {
        // try connecting...
        const client = await XMongoConnection.connect();
        // use database after connection.
        client.useDb(config.database);

        // Log success if not console.
        $.ifNotConsole(() => $.logSuccess('Connected to MongoDB'))
    } catch (err) {
        // Console.log Error
        console.log(err);
        // Exit
        $.logErrorAndExit("Error connecting to mongodb!")
    }

    return next()
};