/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('campeonato', function (table) {
            table.increments('Id');
            table.string('nome', 255).notNullable();
            table.string('logo', 255).notNullable();
            table.date('dataInicio').notNullable();
            table.date('dataFim').notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('campeonato');
};
