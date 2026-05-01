const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('phase', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();

            table.integer('fkChampionshipId').unsigned();
            table.foreign('fkChampionshipId').references('id').inTable('championship');
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('phase');
};
