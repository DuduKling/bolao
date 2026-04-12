/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    const query = knex.schema
        .createTable('pool', function (table) {
            table.increments('id');
            table.string('uuid', 36).notNullable().unique();

            table.string('name', 50).notNullable();
            table.string('description', 255);

            table.enum('status', [
                'tba',
                'open',
                'onGoing',
                'finished',
            ]).defaultTo('tba').notNullable();

            table.dateTime('startDate').notNullable();
            table.dateTime('endDate').notNullable();

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
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
exports.down = function (knex) {
    return knex.schema
        .dropTable('pool');
};
