/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('parte', function (table) {
            table.increments('Id');
            table.string('nome', 255).notNullable();
            table.string('status', 255).notNullable();

            table.integer('fase_Id').unsigned();
            table.foreign('fase_Id').references('Id').inTable('fase');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('parte');
};
