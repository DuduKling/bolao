const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
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
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('pool_part');
};
