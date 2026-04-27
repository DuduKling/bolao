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
$userUuid = htmlspecialchars(strip_tags($reqBody->userUuid));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();
$userData = $user->getData($userUuid);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pool.php';
$pool = new Pool();
$poolChampionshipInfo = $pool->getPoolChampionshipInfo($poolUuid);
$poolFixtures = $pool->getPoolFixtures($poolUuid);
$poolData = $pool->getData($poolUuid);

$userJoin = $pool->userHasJoined($userData['id'], $poolData['id']);

if (!$userJoin['joined']) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Usuário não está participando deste bolão. (Error #GBFU1)"
    ));
    exit();
}

$userPlacedBets = $pool->getUserPoolBets($userData['id'], $poolUuid);

http_response_code(200);
echo json_encode(array(
    "userData" => array(
        "name"=> $userData["name"],
    ),
    "poolChampionshipInfo" => $poolChampionshipInfo,
    'poolFixtures' => $poolFixtures,
    'userPlacedBets' => $userPlacedBets,
));
