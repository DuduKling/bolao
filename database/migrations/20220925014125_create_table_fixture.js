/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    const query = knex.schema
        .createTable('fixture', function (table) {
            table.increments('Id');

            table.integer('awayTeam_Id').unsigned();
            table.foreign('awayTeam_Id').references('Id').inTable('team');

            table.integer('homeTeam_Id').unsigned();
            table.foreign('homeTeam_Id').references('Id').inTable('team');

            table.integer('parte_Id').unsigned();
            table.foreign('parte_Id').references('Id').inTable('parte');

            table.dateTime('dateTime').notNullable();
            table.integer('score_homeTeam');
            table.integer('score_awayTeam');
            table.string('local');
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
        .dropTable('fixture');
};
