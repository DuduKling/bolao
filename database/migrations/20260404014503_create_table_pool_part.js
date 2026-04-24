/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    const query = knex.schema
        .createTable('pool_part', function (table) {
            table.increments('id');

            table.integer('fkPoolId').unsigned().notNullable();
            table.foreign('fkPoolId').references('id').inTable('pool');

            table.integer('fkPartId').unsigned().notNullable();
            table.foreign('fkPartId').references('id').inTable('part');

            table.boolean('canMakeBet').defaultTo(false).notNullable();
            table.boolean('canEditBet').defaultTo(false).notNullable();

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());

            table.unique(['fkPoolId', 'fkPartId']);
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
        .dropTable('pool_part');
};
