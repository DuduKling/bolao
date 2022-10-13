<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$inputData = json_decode(file_get_contents("php://input"));

$parteId = $inputData->parteId;
$statusNeeded = $inputData->status;

$userId = null;
if (isset($inputData->userId)) {
    $userId = $inputData->userId;
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/util/fixtureGetter.php'; 

if (empty($userId)) {
    // Assume-se que é um Admin..
    if ($statusNeeded == "aberto") {
        getFixtures($parteId, "aberto");
    } else {
        getFixtures($parteId, "aposta");
    }
    exit();
}

// Verifica se o usuário já apostou para a parte..
$query = "SELECT * FROM bet
    INNER JOIN fixture ON bet.fixture_Id=fixture.Id
    INNER JOIN parte ON fixture.parte_id=parte.Id
    WHERE parte.id=:parteID
    AND parte.status='aposta'
    AND users_Id=:userID
";

$stmt = $db->prepare($query);

$stmt->bindParam(':parteID', $parteId);
$stmt->bindParam(':userID', $userId);

$stmt->execute();
$num = $stmt->rowCount();

if ($num == 0) {
    // Se o usuário ainda não apostou..
    getFixtures($parteId, "aposta");
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Você já apostou para esta parte do campeonato! (Error #FGF1)"));
}
?>