<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$reqBody = json_decode(file_get_contents("php://input"));

$parteId = $reqBody->parteId;
$statusNeeded = $reqBody->status;

$userId = null;
if (isset($reqBody->userId)) {
    $userId = $reqBody->userId;
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
    INNER JOIN fixture ON bet.fkFixtureId=fixture.Id
    INNER JOIN part ON fixture.fkPartId=part.Id
    WHERE part.id=:partID
    AND part.status='aposta'
    AND fkUserId=:userID
";

$stmt = $db->prepare($query);

$stmt->bindParam(':partID', $parteId);
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