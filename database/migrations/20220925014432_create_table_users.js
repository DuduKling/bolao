/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('users', function (table) {
            table.increments('id');

            table.string('name', 255).notNullable();
            table.string('phoneNumber', 255).notNullable();
            table.string('passwd', 1020).notNullable();
            table.string('salt', 255).notNullable();

            table.string('role', 255);

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').defaultTo(knex.fn.now());
        });

    if (knex.client.config.onlyLogQuery) {
        console.log(query.toString());
        return new Promise((resolve) => resolve());
    }

    return query;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};
