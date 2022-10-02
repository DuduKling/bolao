// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            server: 'localhost:3306',
            database: 'bolao',
            user: 'root',
            password: '123456'
        },
        onlyLogQuery: false,
    }
};
