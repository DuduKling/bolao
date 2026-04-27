<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$reqBody = json_decode(file_get_contents("php://input"));

$poolUuid = htmlspecialchars(strip_tags($reqBody->poolUuid));
$userBets = $reqBody->userBets;

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

$userUuid = $decoded->data->uuid;

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$userData = $user->getData($userUuid);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pool.php';
$pool = new Pool();

$poolData = $pool->getData($poolUuid);

$userJoin = $pool->userHasJoined($userData['id'], $poolData['id']);

$userPoolId = $userJoin['userPoolId'];
if (!$userJoin['joined']) {
    $userPoolId = $pool->joinUserInPool($userData['id'], $poolData['id']);
}

$pool->validateBetsData($userBets);

$pool->makeBets($userPoolId, $userBets);

$poolFixtures = $pool->getPoolFixtures($poolUuid);
$userPlacedBets = $pool->getUserPoolBets($userData['id'], $poolUuid);
$userBetParticipation = $pool->getUserBetParticipation($userData['id'], $poolUuid);

http_response_code(200);
echo json_encode(array(
    "message" => "Aposta realizada com sucesso!",
    'poolFixtures' => $poolFixtures,
    'userPlacedBets' => $userPlacedBets,
    'userBetParticipation' => $userBetParticipation,
));
