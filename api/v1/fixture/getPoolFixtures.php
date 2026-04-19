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

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

$userUuid = $decoded->data->uuid;

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$userData = $user->getData($userUuid);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pool.php';
$pool = new Pool();
$championshipInfo = $pool->getPoolChampionshipInfo($poolUuid);
$poolFixtures = $pool->getPoolFixtures($poolUuid);

$poolData = $pool->getData($poolUuid);

$userHasJoined = $pool->userHasJoined($userData['id'], $poolData['id']);

if ($userHasJoined) {
    $userPlacedBets = $pool->getUserPoolBets($userData['id'], $poolUuid);

    http_response_code(200);
    echo json_encode(array(
        "message" => "Usuário já está participando deste bolão. (Error #POO2)",
        "championshipInfo" => $championshipInfo,
        'poolFixtures'=> $poolFixtures,
        'userPlacedBets' => $userPlacedBets,
    ));
    exit();
}

http_response_code(200);
echo json_encode(array(
    "championshipInfo" => $championshipInfo,
    'poolFixtures'=> $poolFixtures
));
