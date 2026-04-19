const sendToHome = () => '/';
const sendToContact = () => '/faleconosco';
const sendToRules = () => '/regulamento';
const sendToChampionships = (championshipId) => `/campeonato/${championshipId}`;
const sendToChampionship = () => '/campeonatos';

const sendToPools = () => '/pools';
const sendToPoolBet = (poolUuid) => `/pools/${poolUuid}/bet`;
const sendToPoolUserBets = (poolUuid, userUuid) => `/pools/${poolUuid}/user/${userUuid}`;
const sendToPoolDashboard = (poolUuid) => `/pools/${poolUuid}/dashboard`;
const sendToPoolFixture = (poolUuid, fixtureId) => `/pools/${poolUuid}/fixture/${fixtureId}`;

const sendToUserRegister = () => '/user/cadastrar';
const sendToUserLogin = () => '/user/login';
const sendToUserForgotPassword = () => '/user/esqueci';

const sendToAdmin = () => '/admin';

export default {
    sendToHome,
    sendToContact,
    sendToRules,
    sendToChampionships,
    sendToChampionship,
    sendToPools,
    sendToPoolBet,
    sendToPoolUserBets,
    sendToPoolDashboard,
    sendToPoolFixture,
    sendToUserRegister,
    sendToUserLogin,
    sendToUserForgotPassword,
    sendToAdmin,
};
