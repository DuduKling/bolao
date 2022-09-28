/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('bet').del();
  await knex('users').del();
  await knex('fixture').del();
  await knex('team').del();
  await knex('parte').del();
  await knex('fase').del();
  await knex('campeonato').del();

  await knex.schema.raw('ALTER TABLE bet AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE fixture AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE team AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE parte AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE fase AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE campeonato AUTO_INCREMENT = 1');

  await knex('campeonato').insert([
    {
      nome: 'Copa América Brasil 2019',
      logo: 'copa_america_2019.png',
      dataInicio: '2019-06-14',
      dataFim: '2019-07-07'
    },
  ]);
  const [{Id: CampeonatoId}] = await knex('campeonato').select('Id');

  await knex('fase').insert([
    {
      nome: 'Grupos',
      campeonato_Id: CampeonatoId,
    },
    {
      nome: 'Eliminatórias',
      campeonato_Id: CampeonatoId,
    },
  ]);
  const [{Id: faseGruposId}, {Id: faseEliminatoriasId}] = await knex('fase').select('Id');

  await knex('parte').insert([
    {
      nome: 'Tabela',
      status: 'tba',
      fase_Id: faseGruposId,
    },
    {
      nome: 'Quartas',
      status: 'aberto',
      fase_Id: faseEliminatoriasId,
    },
    {
      nome: 'Semi',
      status: 'aposta',
      fase_Id: faseEliminatoriasId,
    },
    {
      nome: 'Final',
      status: 'tba',
      fase_Id: faseEliminatoriasId,
    },
  ]);
  const [, , {Id: parteSemiId}, {Id: parteFinalId}] = await knex('parte').select('Id');

  await knex('team').insert([
    {
      nome: 'Brasil',
      image: 'Flag_of_Brazil.svg',
    },
    {
      nome: 'Argentina',
      image: 'Flag_of_Argentina.svg',
    },
    {
      nome: 'Chile',
      image: 'Flag_of_Chile.svg',
    },
    {
      nome: 'Peru',
      image: 'Flag_of_Peru.svg',
    },
  ]);
  const [{Id: brasilId}, {Id: argentinaId}, {Id: chileId}, {Id: peruId}] = await knex('team').select('Id');

  await knex('fixture').insert([
    {
      parte_Id: parteSemiId,
      homeTeam_Id: brasilId,
      score_homeTeam: '2',
      awayTeam_Id: argentinaId,
      score_awayTeam: '0',
      dateTime: '2019-07-02 21:30:00',
      local: 'Estádio Mineirão',
    },
    {
      parte_Id: parteSemiId,
      homeTeam_Id: chileId,
      score_homeTeam: '0',
      awayTeam_Id: peruId,
      score_awayTeam: '3',
      dateTime: '2019-07-03 21:30:00',
      local: 'Arena do Grêmio',
    },
    {
      parte_Id: parteFinalId,
      homeTeam_Id: brasilId,
      score_homeTeam: '3',
      awayTeam_Id: peruId,
      score_awayTeam: '1',
      dateTime: '2019-07-07 17:00:00',
      local: 'Estádio do Maracanã',
    }
  ]);
  const [{Id: semi1Id}, {Id: semi2Id}, {Id: finalId}] = await knex('fixture').select('Id');

  await knex('users').insert([
    {
      name: 'admin',
      email: "admin@mail.com",
      passwd: '$2y$10$y/HcJqaMOSNMYAHDSA/cVem8A2VBU6G8fohb/r3IYa0BOG7WeefZ6', //admin
      imagePath: '/imagens/users/spawn.jpg',
      role: 'admin',
    },
    {
      name: 'teste',
      email: "teste@mail.com",
      passwd: '$2y$10$qbXRUzw5A0jSKtBqhpNp8e//ueDHAOmOCbuSBQvzSQCugJ/7rqJSK', // teste
    },
  ]);
  const [{Id: userAdminId}, {Id: userNormalId}] = await knex('users').select('Id');

  await knex('bet').insert([
    {
      users_Id: userAdminId,
      fixture_Id: semi1Id,
      bet_homeTeam: '2',
      bet_awayTeam: '0',
      points: '3',
    },
    {
      users_Id: userAdminId,
      fixture_Id: semi2Id,
      bet_homeTeam: '0',
      bet_awayTeam: '0',
      points: '0',
    },
    {
      users_Id: userNormalId,
      fixture_Id: finalId,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
  ]);
};
