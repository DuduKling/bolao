const helper = require('../helpers');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const h = new helper(knex);

  const [champId] = await h.runOrLog(knex('championship')
    .insert({ name: 'Copa do Mundo Canadá, USA, México 2026', logo: 'can_mex_usa_2026.png', startDate: '2026-06-11', endDate: '2026-07-19' }));

  await h.runOrLog(knex('phase').insert([
    { name: 'Grupos', fkChampionshipId: champId, },
    { name: 'Eliminatórias', fkChampionshipId: champId, },
  ]));

  const fase1 = await h.getPhase('Grupos', champId);
  const fase2 = await h.getPhase('Eliminatórias', champId);
  await h.runOrLog(knex('part').insert([
    { name: 'Grupo A', fkPhaseId: fase1, },
    { name: 'Grupo B', fkPhaseId: fase1, },
    { name: 'Grupo C', fkPhaseId: fase1, },
    { name: 'Grupo D', fkPhaseId: fase1, },
    { name: 'Grupo E', fkPhaseId: fase1, },
    { name: 'Grupo F', fkPhaseId: fase1, },
    { name: 'Grupo G', fkPhaseId: fase1, },
    { name: 'Grupo H', fkPhaseId: fase1, },
    { name: 'Grupo I', fkPhaseId: fase1, },
    { name: 'Grupo J', fkPhaseId: fase1, },
    { name: 'Grupo K', fkPhaseId: fase1, },
    { name: 'Grupo L', fkPhaseId: fase1, },
    { name: 'Segunda Fase', fkPhaseId: fase2, },
    { name: 'Oitavas', fkPhaseId: fase2, },
    { name: 'Quartas', fkPhaseId: fase2, },
    { name: 'Semifinal', fkPhaseId: fase2, },
    { name: 'Terceiro Lugar', fkPhaseId: fase2, },
    { name: 'Final', fkPhaseId: fase2, },
  ]));

  const teams = await h.getTeams();

  const grupoA = await h.getPart('Grupo A', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoA, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.RSA, dateTime: '2026-06-11 16:00:00', location: 'Azteca', },
    { fkPartId: grupoA, fkHomeTeamId: teams.KOR, fkAwayTeamId: teams.CZE, dateTime: '2026-06-11 23:00:00', location: 'Akron', },

    { fkPartId: grupoA, fkHomeTeamId: teams.CZE, fkAwayTeamId: teams.RSA, dateTime: '2026-06-18 13:00:00', location: 'Atlanta', },
    { fkPartId: grupoA, fkHomeTeamId: teams.MEX, fkAwayTeamId: teams.KOR, dateTime: '2026-06-18 22:00:00', location: 'Akron', },

    { fkPartId: grupoA, fkHomeTeamId: teams.RSA, fkAwayTeamId: teams.KOR, dateTime: '2026-06-24 22:00:00', location: 'El Gigante de Acero', },
    { fkPartId: grupoA, fkHomeTeamId: teams.CZE, fkAwayTeamId: teams.MEX, dateTime: '2026-06-24 22:00:00', location: 'Azteca', },
  ]));

  const grupoB = await h.getPart('Grupo B', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoB, fkHomeTeamId: teams.CAN, fkAwayTeamId: teams.BIH, dateTime: '2026-06-12 16:00:00', location: 'Toronto Field', },
    { fkPartId: grupoB, fkHomeTeamId: teams.QAT, fkAwayTeamId: teams.SUI, dateTime: '2026-06-12 16:00:00', location: 'Santa Clara', },

    { fkPartId: grupoB, fkHomeTeamId: teams.SUI, fkAwayTeamId: teams.BIH, dateTime: '2026-06-18 16:00:00', location: 'Los Angeles', },
    { fkPartId: grupoB, fkHomeTeamId: teams.CAN, fkAwayTeamId: teams.QAT, dateTime: '2026-06-18 19:00:00', location: 'Vancouver Place', },

    { fkPartId: grupoB, fkHomeTeamId: teams.SUI, fkAwayTeamId: teams.CAN, dateTime: '2026-06-24 16:00:00', location: 'Vancouver Place', },
    { fkPartId: grupoB, fkHomeTeamId: teams.BIH, fkAwayTeamId: teams.QAT, dateTime: '2026-06-24 16:00:00', location: 'Seattle Field', },
  ]));

  const grupoC = await h.getPart('Grupo C', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoC, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.MAR, dateTime: '2026-06-13 19:00:00', location: 'Nova Jersey', },
    { fkPartId: grupoC, fkHomeTeamId: teams.HAI, fkAwayTeamId: teams.SCO, dateTime: '2026-06-13 22:00:00', location: 'Boston', },

    { fkPartId: grupoC, fkHomeTeamId: teams.SCO, fkAwayTeamId: teams.MAR, dateTime: '2026-06-19 19:00:00', location: 'Boston', },
    { fkPartId: grupoC, fkHomeTeamId: teams.BRA, fkAwayTeamId: teams.HAI, dateTime: '2026-06-19 21:30:00', location: 'Filadélfia', },

    { fkPartId: grupoC, fkHomeTeamId: teams.MAR, fkAwayTeamId: teams.HAI, dateTime: '2026-06-24 19:00:00', location: 'Atlanta', },
    { fkPartId: grupoC, fkHomeTeamId: teams.SCO, fkAwayTeamId: teams.BRA, dateTime: '2026-06-24 19:00:00', location: 'Miami', },
  ]));

  const grupoD = await h.getPart('Grupo D', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoD, fkHomeTeamId: teams.USA, fkAwayTeamId: teams.PAR, dateTime: '2026-06-12 22:00:00', location: 'Los Angeles', },
    { fkPartId: grupoD, fkHomeTeamId: teams.AUS, fkAwayTeamId: teams.TUR, dateTime: '2026-06-14 01:00:00', location: 'Vancouver Place', },

    { fkPartId: grupoD, fkHomeTeamId: teams.USA, fkAwayTeamId: teams.AUS, dateTime: '2026-06-19 16:00:00', location: 'Seattle Field', },
    { fkPartId: grupoD, fkHomeTeamId: teams.TUR, fkAwayTeamId: teams.PAR, dateTime: '2026-06-20 01:00:00', location: 'Santa Clara', },

    { fkPartId: grupoD, fkHomeTeamId: teams.TUR, fkAwayTeamId: teams.USA, dateTime: '2026-06-25 23:00:00', location: 'Los Angeles', },
    { fkPartId: grupoD, fkHomeTeamId: teams.PAR, fkAwayTeamId: teams.AUS, dateTime: '2026-06-25 23:00:00', location: 'Santa Clara', },
  ]));

  const grupoE = await h.getPart('Grupo E', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoE, fkHomeTeamId: teams.GER, fkAwayTeamId: teams.CUR, dateTime: '2026-06-14 14:00:00', location: 'Houston', },
    { fkPartId: grupoE, fkHomeTeamId: teams.CIV, fkAwayTeamId: teams.ECU, dateTime: '2026-06-14 20:00:00', location: 'Filadélfia', },

    { fkPartId: grupoE, fkHomeTeamId: teams.GER, fkAwayTeamId: teams.CIV, dateTime: '2026-06-20 17:00:00', location: 'Toronto Field', },
    { fkPartId: grupoE, fkHomeTeamId: teams.ECU, fkAwayTeamId: teams.CUR, dateTime: '2026-06-20 21:00:00', location: 'Kansas City', },

    { fkPartId: grupoE, fkHomeTeamId: teams.ECU, fkAwayTeamId: teams.GER, dateTime: '2026-06-25 17:00:00', location: 'Nova Jersey', },
    { fkPartId: grupoE, fkHomeTeamId: teams.CUR, fkAwayTeamId: teams.CIV, dateTime: '2026-06-25 17:00:00', location: 'Filadélfia', },
  ]));

  const grupoF = await h.getPart('Grupo F', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoF, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.JPN, dateTime: '2026-06-14 17:00:00', location: 'Dallas', },
    { fkPartId: grupoF, fkHomeTeamId: teams.SWE, fkAwayTeamId: teams.TUN, dateTime: '2026-06-14 23:00:00', location: 'El Gigante de Acero', },

    { fkPartId: grupoF, fkHomeTeamId: teams.NED, fkAwayTeamId: teams.SWE, dateTime: '2026-06-20 14:00:00', location: 'Houston', },
    { fkPartId: grupoF, fkHomeTeamId: teams.TUN, fkAwayTeamId: teams.JPN, dateTime: '2026-06-21 01:00:00', location: 'El Gigante de Acero', },

    { fkPartId: grupoF, fkHomeTeamId: teams.TUN, fkAwayTeamId: teams.NED, dateTime: '2026-06-25 20:00:00', location: 'Kansas City', },
    { fkPartId: grupoF, fkHomeTeamId: teams.JPN, fkAwayTeamId: teams.SWE, dateTime: '2026-06-25 20:00:00', location: 'Dallas', },
  ]));

  const grupoG = await h.getPart('Grupo G', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoG, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.EGY, dateTime: '2026-06-15 16:00:00', location: 'Seattle Field', },
    { fkPartId: grupoG, fkHomeTeamId: teams.IRN, fkAwayTeamId: teams.NZL, dateTime: '2026-06-15 22:00:00', location: 'Los Angeles', },

    { fkPartId: grupoG, fkHomeTeamId: teams.BEL, fkAwayTeamId: teams.IRN, dateTime: '2026-06-21 16:00:00', location: 'Los Angeles', },
    { fkPartId: grupoG, fkHomeTeamId: teams.NZL, fkAwayTeamId: teams.EGY, dateTime: '2026-06-21 22:00:00', location: 'Vancouver Place', },

    { fkPartId: grupoG, fkHomeTeamId: teams.EGY, fkAwayTeamId: teams.IRN, dateTime: '2026-06-27 00:00:00', location: 'Seattle Field', },
    { fkPartId: grupoG, fkHomeTeamId: teams.NZL, fkAwayTeamId: teams.BEL, dateTime: '2026-06-27 00:00:00', location: 'Vancouver Place', },
  ]));

  const grupoH = await h.getPart('Grupo H', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoH, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.CPV, dateTime: '2026-06-15 13:00:00', location: 'Atlanta', },
    { fkPartId: grupoH, fkHomeTeamId: teams.KSA, fkAwayTeamId: teams.URU, dateTime: '2026-06-15 19:00:00', location: 'Miami', },

    { fkPartId: grupoH, fkHomeTeamId: teams.ESP, fkAwayTeamId: teams.KSA, dateTime: '2026-06-21 13:00:00', location: 'Atlanta', },
    { fkPartId: grupoH, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.CPV, dateTime: '2026-06-21 19:00:00', location: 'Miami', },

    { fkPartId: grupoH, fkHomeTeamId: teams.CPV, fkAwayTeamId: teams.KSA, dateTime: '2026-06-26 21:00:00', location: 'Houston', },
    { fkPartId: grupoH, fkHomeTeamId: teams.URU, fkAwayTeamId: teams.ESP, dateTime: '2026-06-26 21:00:00', location: 'Akron', },
  ]));

  const grupoI = await h.getPart('Grupo I', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoI, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.SEN, dateTime: '2026-06-16 16:00:00', location: 'Nova Jersey', },
    { fkPartId: grupoI, fkHomeTeamId: teams.IRQ, fkAwayTeamId: teams.NOR, dateTime: '2026-06-16 19:00:00', location: 'Boston', },

    { fkPartId: grupoI, fkHomeTeamId: teams.FRA, fkAwayTeamId: teams.IRQ, dateTime: '2026-06-22 18:00:00', location: 'Filadélfia', },
    { fkPartId: grupoI, fkHomeTeamId: teams.NOR, fkAwayTeamId: teams.SEN, dateTime: '2026-06-22 21:00:00', location: 'Nova Jersey', },

    { fkPartId: grupoI, fkHomeTeamId: teams.SEN, fkAwayTeamId: teams.IRQ, dateTime: '2026-06-26 16:00:00', location: 'Toronto Field', },
    { fkPartId: grupoI, fkHomeTeamId: teams.NOR, fkAwayTeamId: teams.FRA, dateTime: '2026-06-26 16:00:00', location: 'Boston', },
  ]));

  const grupoJ = await h.getPart('Grupo J', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoJ, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.ALG, dateTime: '2026-06-16 22:00:00', location: 'Kansas City', },
    { fkPartId: grupoJ, fkHomeTeamId: teams.AUT, fkAwayTeamId: teams.JOR, dateTime: '2026-06-17 01:00:00', location: 'Santa Clara', },

    { fkPartId: grupoJ, fkHomeTeamId: teams.ARG, fkAwayTeamId: teams.AUT, dateTime: '2026-06-22 14:00:00', location: 'Dallas', },
    { fkPartId: grupoJ, fkHomeTeamId: teams.JOR, fkAwayTeamId: teams.ALG, dateTime: '2026-06-23 00:00:00', location: 'Santa Clara', },

    { fkPartId: grupoJ, fkHomeTeamId: teams.JOR, fkAwayTeamId: teams.ARG, dateTime: '2026-06-27 23:00:00', location: 'Dallas', },
    { fkPartId: grupoJ, fkHomeTeamId: teams.ALG, fkAwayTeamId: teams.AUT, dateTime: '2026-06-27 23:00:00', location: 'Kansas City', },
  ]));

  const grupoK = await h.getPart('Grupo K', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoK, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.COD, dateTime: '2026-06-17 14:00:00', location: 'Houston', },
    { fkPartId: grupoK, fkHomeTeamId: teams.UZB, fkAwayTeamId: teams.COL, dateTime: '2026-06-17 23:00:00', location: 'Azteca', },

    { fkPartId: grupoK, fkHomeTeamId: teams.POR, fkAwayTeamId: teams.UZB, dateTime: '2026-06-23 14:00:00', location: 'Houston', },
    { fkPartId: grupoK, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.COD, dateTime: '2026-06-23 23:00:00', location: 'Akron', },

    { fkPartId: grupoK, fkHomeTeamId: teams.COD, fkAwayTeamId: teams.UZB, dateTime: '2026-06-27 20:30:00', location: 'Atlanta', },
    { fkPartId: grupoK, fkHomeTeamId: teams.COL, fkAwayTeamId: teams.POR, dateTime: '2026-06-27 20:30:00', location: 'Miami', },
  ]));

  const grupoL = await h.getPart('Grupo L', fase1);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: grupoL, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.CRO, dateTime: '2026-06-17 17:00:00', location: 'Dallas', },
    { fkPartId: grupoL, fkHomeTeamId: teams.GHA, fkAwayTeamId: teams.PAN, dateTime: '2026-06-17 20:00:00', location: 'Toronto Field', },

    { fkPartId: grupoL, fkHomeTeamId: teams.ENG, fkAwayTeamId: teams.GHA, dateTime: '2026-06-23 17:00:00', location: 'Boston', },
    { fkPartId: grupoL, fkHomeTeamId: teams.PAN, fkAwayTeamId: teams.CRO, dateTime: '2026-06-23 20:00:00', location: 'Toronto Field', },

    { fkPartId: grupoL, fkHomeTeamId: teams.CRO, fkAwayTeamId: teams.GHA, dateTime: '2026-06-27 18:00:00', location: 'Filadélfia', },
    { fkPartId: grupoL, fkHomeTeamId: teams.PAN, fkAwayTeamId: teams.ENG, dateTime: '2026-06-27 18:00:00', location: 'Nova Jersey', },
  ]));

  const segFase = await h.getPart('Segunda Fase', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-29 17:30:00', location: 'Boston', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-30 18:00:00', location: 'Nova Jersey', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-28 16:00:00', location: 'Los Angeles', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-29 22:00:00', location: 'El Gigante de Acero', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-02 20:00:00', location: 'Toronto Field', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-02 16:00:00', location: 'Los Angeles', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-01 21:00:00', location: 'Santa Clara', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-01 17:00:00', location: 'Seattle Field', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-29 14:00:00', location: 'Houston', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-30 14:00:00', location: 'Dallas', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-06-30 22:00:00', location: 'Azteca', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-01 13:00:00', location: 'Atlanta', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-03 19:00:00', location: 'Miami', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-03 15:00:00', location: 'Dallas', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-03 00:00:00', location: 'Vancouver Place', },
    { fkPartId: segFase, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-03 22:30:00', location: 'Kansas City', },
  ]));

  const oitavas = await h.getPart('Oitavas', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-04 18:00:00', location: 'Filadélfia', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-04 14:00:00', location: 'Houston', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-06 16:00:00', location: 'Dallas', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-06 21:00:00', location: 'Seattle Field', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-05 17:00:00', location: 'Nova Jersey', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-05 21:00:00', location: 'Azteca', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-07 13:00:00', location: 'Atlanta', },
    { fkPartId: oitavas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-07 17:00:00', location: 'Vancouver Place', },
  ]));

  const quartas = await h.getPart('Quartas', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: quartas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-09 17:00:00', location: 'Boston', },
    { fkPartId: quartas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-10 16:00:00', location: 'Los Angeles', },
    { fkPartId: quartas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-11 18:00:00', location: 'Miami', },
    { fkPartId: quartas, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-11 22:00:00', location: 'Kansas City', },
  ]));

  const semi = await h.getPart('Semifinal', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: semi, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-14 16:00:00', location: 'Dallas', },
    { fkPartId: semi, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-15 16:00:00', location: 'Atlanta', },
  ]));

  const terceiro = await h.getPart('Terceiro Lugar', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: terceiro, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-18 18:00:00', location: 'Miami', },
  ]));

  const final = await h.getPart('Final', fase2);
  await h.runOrLog(knex('fixture').insert([
    { fkPartId: final, fkHomeTeamId: teams.UNDEF, fkAwayTeamId: teams.UNDEF, dateTime: '2026-07-19 16:00:00', location: 'Nova Jersey', },
  ]));

};
