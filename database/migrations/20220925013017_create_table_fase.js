/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('fase', function (table) {
            table.increments('Id');
            table.string('nome', 255).notNullable();

            table.integer('campeonato_Id').unsigned();
            table.foreign('campeonato_Id').references('Id').inTable('campeonato');
        });

    if (knex.client.config.onlyLogQuery) {
        console.log(query.toString());
        return new Promise((resolve) => resolve());
    }

    return query;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('fase');
};
