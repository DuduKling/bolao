const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('fixture', function (table) {
            table.increments('id');

            table.integer('fkAwayTeamId').unsigned();
            table.foreign('fkAwayTeamId').references('id').inTable('team');

            table.integer('fkHomeTeamId').unsigned();
            table.foreign('fkHomeTeamId').references('id').inTable('team');

            table.integer('fkPartId').unsigned();
            table.foreign('fkPartId').references('id').inTable('part');

            table.dateTime('dateTime').notNullable();
            table.integer('homeTeamScore');
            table.integer('awayTeamScore');
            table.string('location');
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('fixture');
};
