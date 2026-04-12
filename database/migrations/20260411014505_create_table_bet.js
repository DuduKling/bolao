/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('bet', function (table) {
            table.increments('id');

            table.integer('fkUserPoolId').unsigned();
            table.foreign('fkUserPoolId').references('id').inTable('user_pool');

            table.integer('fkFixtureId').unsigned();
            table.foreign('fkFixtureId').references('id').inTable('fixture');

            table.integer('homeTeamScoreBet').notNullable();
            table.integer('awayTeamScoreBet').notNullable();
            table.integer('points');
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
exports.down = function(knex) {
    return knex.schema
        .dropTable('bet');
};
