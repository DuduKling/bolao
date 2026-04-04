/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('phase', function (table) {
            table.increments('Id');
            table.string('name', 255).notNullable();

            table.integer('fkChampionshipId').unsigned();
            table.foreign('fkChampionshipId').references('Id').inTable('championship');
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
        .dropTable('phase');
};
