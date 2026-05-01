const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('user', function (table) {
            table.increments('id');
            table.string('uuid', 36).notNullable().unique();

            table.string('name', 255).notNullable();
            table.string('phoneNumber', 255).notNullable();
            table.string('passwd', 1020).notNullable();
            table.string('salt', 255).notNullable();

            table.string('role', 255);

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').defaultTo(knex.fn.now());
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('user');
};
