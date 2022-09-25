/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('bet', function (table) {
            table.increments('Id');

            table.integer('users_Id').unsigned();
            table.foreign('users_Id').references('Id').inTable('users');

            table.integer('fixture_Id').unsigned();
            table.foreign('fixture_Id').references('Id').inTable('fixture');

            table.integer('bet_homeTeam').notNullable();
            table.integer('bet_awayTeam').notNullable();
            table.integer('points');
            table.dateTime('created').notNullable().defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('bet');
};
