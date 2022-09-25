/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('Id');
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('passwd', 255).notNullable();

            table.string('imagePath', 255);
            table.string('role', 255);

            table.dateTime('created').notNullable().defaultTo(knex.fn.now());
            table.dateTime('modified').defaultTo(knex.fn.now());
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};
