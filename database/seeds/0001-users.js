/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('user').insert([
    {
      uuid: '1',
      name: 'admin',
      phoneNumber: "99999999999",
      passwd: '$2y$12$XZt9g1MuX1EMiPqBbVzGsuZUpK65xFaelYnFEyOP7VdLQCJxza9Ym',
      salt: 'salt_salt',
      role: 'admin',
    },
    {
      uuid: '2',
      name: 'teste',
      phoneNumber: "99999999999",
      passwd: '$2y$12$XZt9g1MuX1EMiPqBbVzGsuZUpK65xFaelYnFEyOP7VdLQCJxza9Ym',
      salt: 'salt_salt',
    },
    {
      uuid: '3',
      name: 'loser',
      phoneNumber: "99999999999",
      passwd: '$2y$12$XZt9g1MuX1EMiPqBbVzGsuZUpK65xFaelYnFEyOP7VdLQCJxza9Ym',
      salt: 'salt_salt',
    },
  ]);

};
