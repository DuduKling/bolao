const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('championship', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('logo', 255).notNullable();
            table.date('startDate').notNullable();
            table.date('endDate').notNullable();
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('championship');
};
