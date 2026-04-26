const sendToHome = () => '/';
const sendToContact = () => '/contact';
const sendToRules = () => '/rules';
const sendToChampionships = () => '/championships';
const sendToChampionship = (championshipId) => `/championship/${championshipId}`;

const sendToPools = () => '/pools';
const sendToPoolBet = (poolUuid) => `/pools/${poolUuid}/bet`;
const sendToPoolUserBets = (poolUuid, userUuid) => `/pools/${poolUuid}/user/${userUuid}`;
const sendToPoolDashboard = (poolUuid) => `/pools/${poolUuid}/dashboard`;
const sendToPoolFixture = (poolUuid, fixtureId) => `/pools/${poolUuid}/fixture/${fixtureId}`;

const sendToUserRegister = () => '/user/cadastrar';
const sendToUserLogin = () => '/user/login';
const sendToUserForgotPassword = () => '/user/esqueci';

const sendToAdmin = () => '/admin';
const sendToAdminPoolCreate = () => '/admin/pool';
const sendToAdminPool = (poolUuid) => `/admin/pool/${poolUuid}`;
const sendToAdminChampionship = (championshipId) => `/admin/championship/${championshipId}`;

export default {
    sendToHome,
    sendToContact,
    sendToRules,
    sendToChampionship,
    sendToChampionships,
    sendToPools,
    sendToPoolBet,
    sendToPoolUserBets,
    sendToPoolDashboard,
    sendToPoolFixture,
    sendToUserRegister,
    sendToUserLogin,
    sendToUserForgotPassword,
    sendToAdmin,
    sendToAdminPoolCreate,
    sendToAdminPool,
    sendToAdminChampionship,
};
