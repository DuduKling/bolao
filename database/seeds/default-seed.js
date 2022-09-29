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
      nome: 'Copa do Mundo Russia 2018',
      logo: 'russia_2018.png',
      dataInicio: '2018-06-14',
      dataFim: '2018-07-15'
    },
    {
      nome: 'Copa América Brasil 2019',
      logo: 'copa_america_2019.png',
      dataInicio: '2019-06-14',
      dataFim: '2019-07-07'
    },
    {
      nome: 'Copa do Mundo Qtar 2022',
      logo: 'qatar_2022.png',
      dataInicio: '2022-11-20',
      dataFim: '2022-12-18'
    },
  ]);
  const [{Id: russia2018}, {Id: america2019}, {Id: qtar2022}] = await knex('campeonato').select('Id');

  await knex('fase').insert([
    {
      nome: 'Grupos',
      campeonato_Id: russia2018,
    },
    {
      nome: 'Grupos',
      campeonato_Id: america2019,
    },
    {
      nome: 'Eliminatórias',
      campeonato_Id: america2019,
    },
    {
      nome: 'Grupos',
      campeonato_Id: qtar2022,
    },
  ]);
  const [{Id: gruposRussia2018}, {Id: gruposAmerica2019}, {Id: eliminAmerica2019}, {Id: GruposQtar2022}] = await knex('fase').select('Id');

  await knex('parte').insert([
    {
      nome: 'Tabela',
      status: 'finalizado',
      fase_Id: gruposRussia2018,
    },
    {
      nome: 'Tabela',
      status: 'aberto',
      fase_Id: gruposAmerica2019,
    },
    {
      nome: 'Quartas',
      status: 'aberto',
      fase_Id: eliminAmerica2019,
    },
    {
      nome: 'Semi',
      status: 'aposta',
      fase_Id: eliminAmerica2019,
    },
    {
      nome: 'Final',
      status: 'aposta',
      fase_Id: eliminAmerica2019,
    },
    {
      nome: 'Tabela',
      status: 'tba',
      fase_Id: GruposQtar2022,
    },
  ]);
  const [{Id: tabelaRussia2018}, {Id: tabelaAmerica2019}, {Id: quartasAmerica2019}, {Id: semiAmerica2019}, {Id: finalAmerica2019}, {Id: tabelaQtar2022}] = await knex('parte').select('Id');

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
      parte_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '10',
      awayTeam_Id: argentinaId,
      score_awayTeam: '0',
      dateTime: '2019-07-01 21:30:00',
      local: 'Estádio Mineirão',
    },
    {
      parte_Id: tabelaRussia2018,
      homeTeam_Id: argentinaId,
      score_homeTeam: '0',
      awayTeam_Id: brasilId,
      score_awayTeam: '20',
      dateTime: '2019-08-02 21:35:00',
      local: 'Estádio do Grêmio',
    },
    {
      parte_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: argentinaId,
      score_awayTeam: '7',
      dateTime: '2019-09-03 21:40:00',
      local: 'Estádio Mineirão',
    },
    {
      parte_Id: tabelaRussia2018,
      homeTeam_Id: argentinaId,
      score_homeTeam: '0',
      awayTeam_Id: brasilId,
      score_awayTeam: '10',
      dateTime: '2019-10-04 21:45:00',
      local: 'Estádio do Grêmio',
    },
    {
      parte_Id: tabelaRussia2018,
      homeTeam_Id: brasilId,
      score_homeTeam: '10',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-11-05 21:50:00',
      local: 'Estádio Mineirão',
    },

    {
      parte_Id: tabelaAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: chileId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      local: 'Estádio do Grêmio',
    },
    {
      parte_Id: tabelaAmerica2019,
      homeTeam_Id: peruId,
      score_homeTeam: '2',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      local: 'Estádio do Grêmio',
    },
    {
      parte_Id: tabelaAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: argentinaId,
      score_awayTeam: null,
      dateTime: '2019-08-01 21:50:00',
      local: 'Estádio Mineirão',
    },

    {
      parte_Id: quartasAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: '1',
      awayTeam_Id: chileId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      local: 'Estádio Mineirão',
    },
    {
      parte_Id: quartasAmerica2019,
      homeTeam_Id: peruId,
      score_homeTeam: '2',
      awayTeam_Id: argentinaId,
      score_awayTeam: '1',
      dateTime: '2019-08-01 21:50:00',
      local: 'Estádio Mineirão',
    },

    {
      parte_Id: semiAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: argentinaId,
      score_awayTeam: null,
      dateTime: '2019-07-02 21:30:00',
      local: 'Estádio Mineirão',
    },
    {
      parte_Id: semiAmerica2019,
      homeTeam_Id: chileId,
      score_homeTeam: null,
      awayTeam_Id: peruId,
      score_awayTeam: null,
      dateTime: '2019-07-03 21:30:00',
      local: 'Arena do Grêmio',
    },
    {
      parte_Id: finalAmerica2019,
      homeTeam_Id: brasilId,
      score_homeTeam: null,
      awayTeam_Id: peruId,
      score_awayTeam: null,
      dateTime: '2019-07-07 17:00:00',
      local: 'Estádio do Maracanã',
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
  ]);
};
