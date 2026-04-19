<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$reqBody = json_decode(file_get_contents("php://input"));

$championshipId = htmlspecialchars(strip_tags($reqBody->championshipId));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/championship.php';
$championship = new Championship();

$fixtures = $championship->getFixtures($championshipId);
$poolChampionshipInfo = $championship->getInfo($championshipId);

http_response_code(200);
echo json_encode(array(
    "poolChampionshipInfo" => $poolChampionshipInfo[0],
    "fixtures" => $fixtures
));
