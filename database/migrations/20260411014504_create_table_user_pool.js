const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('user_pool', function (table) {
            table.increments('id');

            table.integer('fkUserId').unsigned();
            table.foreign('fkUserId').references('id').inTable('user');

            table.integer('fkPoolId').unsigned();
            table.foreign('fkPoolId').references('id').inTable('pool');

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('user_pool');
};
