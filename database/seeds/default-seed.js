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
      fkChampionshipId: russia2018,
    },
    {
      name: 'Grupos',
      fkChampionshipId: america2019,
    },
    {
      name: 'Eliminatórias',
      fkChampionshipId: america2019,
    },
    {
      name: 'Grupos',
      fkChampionshipId: qtar2022,
    },
  ]);
  const [{Id: gruposRussia2018}, {Id: gruposAmerica2019}, {Id: eliminAmerica2019}, {Id: GruposQtar2022}] = await knex('phase').select('Id');

  await knex('part').insert([
    {
      name: 'Tabela',
      status: 'finalizado',
      fkPhaseId: gruposRussia2018,
    },
    {
      name: 'Tabela',
      status: 'aberto',
      fkPhaseId: gruposAmerica2019,
    },
    {
      name: 'Quartas',
      status: 'aberto',
      fkPhaseId: eliminAmerica2019,
    },
    {
      name: 'Semi',
      status: 'aposta',
      fkPhaseId: eliminAmerica2019,
    },
    {
      name: 'Final',
      status: 'aposta',
      fkPhaseId: eliminAmerica2019,
    },
    {
      name: 'Tabela',
      status: 'tba',
      fkPhaseId: GruposQtar2022,
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
      fkPartId: tabelaRussia2018,
      fkHomeTeamId: brasilId,
      homeTeamScore: '10',
      fkAwayTeamId: argentinaId,
      awayTeamScore: '0',
      dateTime: '2019-07-01 21:30:00',
      location: 'Estádio Mineirão',
    },
    {
      fkPartId: tabelaRussia2018,
      fkHomeTeamId: argentinaId,
      homeTeamScore: '0',
      fkAwayTeamId: brasilId,
      awayTeamScore: '20',
      dateTime: '2019-08-02 21:35:00',
      location: 'Estádio do Grêmio',
    },
    {
      fkPartId: tabelaRussia2018,
      fkHomeTeamId: brasilId,
      homeTeamScore: '1',
      fkAwayTeamId: argentinaId,
      awayTeamScore: '7',
      dateTime: '2019-09-03 21:40:00',
      location: 'Estádio Mineirão',
    },
    {
      fkPartId: tabelaRussia2018,
      fkHomeTeamId: argentinaId,
      homeTeamScore: '0',
      fkAwayTeamId: brasilId,
      awayTeamScore: '10',
      dateTime: '2019-10-04 21:45:00',
      location: 'Estádio do Grêmio',
    },
    {
      fkPartId: tabelaRussia2018,
      fkHomeTeamId: brasilId,
      homeTeamScore: '10',
      fkAwayTeamId: argentinaId,
      awayTeamScore: '1',
      dateTime: '2019-11-05 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      fkPartId: tabelaAmerica2019,
      fkHomeTeamId: brasilId,
      homeTeamScore: '1',
      fkAwayTeamId: chileId,
      awayTeamScore: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio do Grêmio',
    },
    {
      fkPartId: tabelaAmerica2019,
      fkHomeTeamId: peruId,
      homeTeamScore: '2',
      fkAwayTeamId: argentinaId,
      awayTeamScore: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio do Grêmio',
    },
    {
      fkPartId: tabelaAmerica2019,
      fkHomeTeamId: brasilId,
      homeTeamScore: null,
      fkAwayTeamId: argentinaId,
      awayTeamScore: null,
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      fkPartId: quartasAmerica2019,
      fkHomeTeamId: brasilId,
      homeTeamScore: '1',
      fkAwayTeamId: chileId,
      awayTeamScore: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },
    {
      fkPartId: quartasAmerica2019,
      fkHomeTeamId: peruId,
      homeTeamScore: '2',
      fkAwayTeamId: argentinaId,
      awayTeamScore: '1',
      dateTime: '2019-08-01 21:50:00',
      location: 'Estádio Mineirão',
    },

    {
      fkPartId: semiAmerica2019,
      fkHomeTeamId: brasilId,
      homeTeamScore: null,
      fkAwayTeamId: argentinaId,
      awayTeamScore: null,
      dateTime: '2019-07-02 21:30:00',
      location: 'Estádio Mineirão',
    },
    {
      fkPartId: semiAmerica2019,
      fkHomeTeamId: chileId,
      homeTeamScore: null,
      fkAwayTeamId: peruId,
      awayTeamScore: null,
      dateTime: '2019-07-03 21:30:00',
      location: 'Arena do Grêmio',
    },
    {
      fkPartId: finalAmerica2019,
      fkHomeTeamId: brasilId,
      homeTeamScore: null,
      fkAwayTeamId: peruId,
      awayTeamScore: null,
      dateTime: '2019-07-07 17:00:00',
      location: 'Estádio do Maracanã',
    },
  ]);
  const [{Id: russiaF1}, {Id: russiaF2}, {Id: russiaF3}, {Id: russiaF4}, {Id: russiaF5}, {Id: tAmericaF1}, {Id: tAmericaF2}, {Id: qAmericaF1}, {Id: qAmericaF2}] = await knex('fixture').select('Id');

  await knex('users').insert([
    {
      name: 'admin',
      phoneNumber: "99999999999",
      passwd: '$2y$12$XZt9g1MuX1EMiPqBbVzGsuZUpK65xFaelYnFEyOP7VdLQCJxza9Ym',
      salt: 'salt_salt',
      role: 'admin',
    },
    {
      name: 'teste',
      phoneNumber: "99999999999",
      passwd: '$2y$12$XZt9g1MuX1EMiPqBbVzGsuZUpK65xFaelYnFEyOP7VdLQCJxza9Ym',
      salt: 'salt_salt',
    },
  ]);
  const [{Id: userAdminId}, {Id: userNormalId}] = await knex('users').select('Id');

  await knex('bet').insert([
    {
      fkUserId: userNormalId,
      fkFixtureId: russiaF1,
      homeTeamScoreBet: '2',
      awayTeamScoreBet: '0',
      points: '3',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: russiaF2,
      homeTeamScoreBet: '0',
      awayTeamScoreBet: '0',
      points: '0',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: russiaF3,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: russiaF4,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: russiaF5,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },

    {
      fkUserId: userNormalId,
      fkFixtureId: tAmericaF1,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: tAmericaF2,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },

    {
      fkUserId: userNormalId,
      fkFixtureId: qAmericaF1,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userNormalId,
      fkFixtureId: qAmericaF2,
      homeTeamScoreBet: '3',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userAdminId,
      fkFixtureId: qAmericaF1,
      homeTeamScoreBet: '1',
      awayTeamScoreBet: '0',
      points: '2',
    },
    {
      fkUserId: userAdminId,
      fkFixtureId: qAmericaF2,
      homeTeamScoreBet: '0',
      awayTeamScoreBet: '3',
      points: '2',
    },
  ]);
};
