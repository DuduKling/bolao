const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('team', function (table) {
            table.increments('id');
            table.string('code', 10).unique().notNullable();
            table.string('name', 255).notNullable();
            table.string('imagePath', 255).notNullable();
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('team');
};
