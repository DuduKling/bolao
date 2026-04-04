/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('fixture', function (table) {
            table.increments('Id');

            table.integer('fkAwayTeamId').unsigned();
            table.foreign('fkAwayTeamId').references('Id').inTable('team');

            table.integer('fkHomeTeamId').unsigned();
            table.foreign('fkHomeTeamId').references('Id').inTable('team');

            table.integer('fkPartId').unsigned();
            table.foreign('fkPartId').references('Id').inTable('part');

            table.dateTime('dateTime').notNullable();
            table.integer('homeTeamScore');
            table.integer('awayTeamScore');
            table.string('location');
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
        .dropTable('fixture');
};
