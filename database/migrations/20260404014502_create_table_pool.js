const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const h = new helper(knex);
    await h.runOrLog(knex.schema
        .createTable('pool', function (table) {
            table.increments('id');
            table.string('uuid', 36).notNullable().unique();

            table.string('name', 50).notNullable();
            table.string('description', 255);

            // TODO: melhorar esse status geral
            // precisa ter um status também no pool_part
            // flag para ligar visualização das apostas dos outros (pool_part)
            table.enum('status', [
                'tba', // cant view dashboard
                'open', // can view dashboard and can make bets
                'onGoing', // can view dashboard 
                'finished',
            ]).defaultTo('tba').notNullable();

            table.boolean('canMakeBet').defaultTo(false).notNullable();
            table.boolean('canEditBet').defaultTo(false).notNullable();
            table.boolean('canViewOthersBet').defaultTo(false).notNullable();

            table.dateTime('startDate').notNullable();
            table.dateTime('endDate').notNullable();

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
        }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('pool');
};
