/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('bet').del();
  await knex('users').del();
  await knex('fixture').del();
  await knex('team').del();
  await knex('part').del();
  await knex('phase').del();
  await knex('championship').del();

  await knex.schema.raw('ALTER TABLE bet AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE users AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE fixture AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE team AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE part AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE phase AUTO_INCREMENT = 1');
  await knex.schema.raw('ALTER TABLE championship AUTO_INCREMENT = 1');

  await knex('championship').insert([
    {
      name: 'Copa do Mundo Russia 2018',
      logo: 'russia_2018.png',
      startDate: '2018-06-14',
      endDate: '2018-07-15'
    },
    {
      name: 'Copa América Brasil 2019',
      logo: 'copa_america_2019.png',
      startDate: '2019-06-14',
      endDate: '2019-07-07'
    },
    {
      name: 'Copa do Mundo Qtar 2022',
      logo: 'qatar_2022.png',
      startDate: '2022-11-20',
      endDate: '2022-12-18'
    },
  ]);
  const [{Id: russia2018}, {Id: america2019}, {Id: qtar2022}] = await knex('championship').select('Id');

  await knex('phase').insert([
    {
      name: 'Grupos',
      championship_Id: russia2018,
    },
    {
      name: 'Grupos',
      championship_Id: america2019,
    },
    {
      name: 'Eliminatórias',
      championship_Id: america2019,
    },
    {
      name: 'Grupos',
      championship_Id: qtar2022,
    },
  ]);
  const [{Id: gruposRussia2018}, {Id: gruposAmerica2019}, {Id: eliminAmerica2019}, {Id: GruposQtar2022}] = await knex('phase').select('Id');

  await knex('part').insert([
    {
      name: 'Tabela',
      status: 'finalizado',
      phase_Id: gruposRussia2018,
    },
    {
      name: 'Tabela',
      status: 'aberto',
      phase_Id: gruposAmerica2019,
    },
    {
      name: 'Quartas',
      status: 'aberto',
      phase_Id: eliminAmerica2019,
    },
    {
      name: 'Semi',
      status: 'aposta',
      phase_Id: eliminAmerica2019,
    },
    {
      name: 'Final',
      status: 'aposta',
      phase_Id: eliminAmerica2019,
    },
    {
      name: 'Tabela',
      status: 'tba',
      phase_Id: GruposQtar2022,
    },
  ]);
  const [{Id: tabelaRussia2018}, {Id: tabelaAmerica2019}, {Id: quartasAmerica2019}, {Id: semiAmerica2019}, {Id: finalAmerica2019}, {Id: tabelaQtar2022}] = await knex('part').select('Id');

  await knex('team').insert([
    {
      name: 'Brasil',
      imagePath: 'Flag_of_Brazil.svg',
    },
    {
      name: 'Argentina',
      imagePath: 'Flag_of_Argentina.svg',
    },
    {
      name: 'Chile',
      imagePath: 'Flag_of_Chile.svg',
    },
    {
      name: 'Peru',
      imagePath: 'Flag_of_Peru.svg',
    },
  ]);
  const [{Id: brasilId}, {Id: argentinaId}, {Id: chileId}, {Id: peruId}] = await knex('team').select('Id');

  await knex('fixture').insert([
    {
      part_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '10',
      awayTeam_Id: argentinaId,
      score_awayTeam: '0',
      dateTime: '2019-07-01 21:30:00',
      location: 'Estádio Mineirão',
    },
    {
      part_Id: tabelaRussia2018,
      homeTeam_Id: argentinaId,
      score_homeTeam: '0',
      awayTeam_Id: brasilId,
      score_awayTeam: '20',
      dateTime: '2019-08-02 21:35:00',
      location: 'Estádio do Grêmio',
    },
    {
      part_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: argentinaId,
      score_awayTeam: '7',
      dateTime: '2019-09-03 21:40:00',
      location: 'Estádio Mineirão',
    },
    {
      part_Id: tabelaRussia2018,
      homeTeam_Id: argentinaId,
      score_homeTeam: '0',
      awayTeam_Id: brasilId,
      score_awayTeam: '10',
      dateTime: '2019-10-04 21:45:00',
      location: 'Estádio do Grêmio',
    },
    {
      part_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '10',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-11-05 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      part_Id: tabelaAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: chileId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio do Grêmio',
    },
    {
      part_Id: tabelaAmerica2019,
      homeTeam_Id: peruId,
      score_homeTeam: '2',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio do Grêmio',
    },
    {
      part_Id: tabelaAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: argentinaId,
      score_awayTeam: null,
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      part_Id: quartasAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: chileId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },
    {
      part_Id: quartasAmerica2019,
      homeTeam_Id: peruId,
      score_homeTeam: '2',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      part_Id: semiAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: argentinaId,
      score_awayTeam: null,
      dateTime: '2019-07-02 21:30:00',
      location: 'Estádio Mineirão',
    },
    {
      part_Id: semiAmerica2019,
      homeTeam_Id: chileId,
      score_homeTeam: null,
      awayTeam_Id: peruId,
      score_awayTeam: null,
      dateTime: '2019-07-03 21:30:00',
      location: 'Arena do Grêmio',
    },
    {
      part_Id: finalAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: peruId,
      score_awayTeam: null,
      dateTime: '2019-07-07 17:00:00',
      location: 'Estádio do Maracanã',
    },
  ]);
  const [{Id: russiaF1}, {Id: russiaF2}, {Id: russiaF3}, {Id: russiaF4}, {Id: russiaF5}, {Id: tAmericaF1}, {Id: tAmericaF2}, {Id: qAmericaF1}, {Id: qAmericaF2}] = await knex('fixture').select('Id');

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
      users_Id: userNormalId,
      fixture_Id: russiaF1,
      bet_homeTeam: '2',
      bet_awayTeam: '0',
      points: '3',
    },
    {
      users_Id: userNormalId,
      fixture_Id: russiaF2,
      bet_homeTeam: '0',
      bet_awayTeam: '0',
      points: '0',
    },
    {
      users_Id: userNormalId,
      fixture_Id: russiaF3,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userNormalId,
      fixture_Id: russiaF4,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userNormalId,
      fixture_Id: russiaF5,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },

    {
      users_Id: userNormalId,
      fixture_Id: tAmericaF1,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userNormalId,
      fixture_Id: tAmericaF2,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },

    {
      users_Id: userNormalId,
      fixture_Id: qAmericaF1,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userNormalId,
      fixture_Id: qAmericaF2,
      bet_homeTeam: '3',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userAdminId,
      fixture_Id: qAmericaF1,
      bet_homeTeam: '1',
      bet_awayTeam: '0',
      points: '2',
    },
    {
      users_Id: userAdminId,
      fixture_Id: qAmericaF2,
      bet_homeTeam: '0',
      bet_awayTeam: '3',
      points: '2',
    },
  ]);
};
