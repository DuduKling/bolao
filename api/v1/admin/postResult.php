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

$championshipId = htmlspecialchars(strip_tags($reqBody->championshipId));
$scores = $reqBody->scores;

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

$userRole = $decoded->data->role;

if ($userRole != 'admin') {
    http_response_code(401);
    echo json_encode(array(
        'message' => 'Usuário não é administrador'
    ));
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/championship.php';
$championship = new Championship();

$championship->validateScoresData($scores);
$championship->setFixtureScoreAndUpdateBetPoints($scores);

$fixtures = $championship->getFixtures($championshipId);
$championshipInfo = $championship->getInfo($championshipId);

http_response_code(200);
echo json_encode(array(
    "message" => "Resultado e pontuação atualizados com sucesso!",
    "championshipInfo" => $championshipInfo,
    "fixtures" => $fixtures
));
