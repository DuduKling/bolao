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

$faseId = $inputData->faseID;

$query = "SELECT select2.usernames, GROUP_CONCAT(select2.parts ORDER BY partId ASC SEPARATOR ',') as partsApostadas
    FROM (
        SELECT DISTINCT users.name as usernames, part.name as parts, part.id as partId FROM bet
        LEFT JOIN fixture ON bet.fkFixtureId = fixture.id
        LEFT JOIN part ON fixture.fkPartId = part.id
        LEFT JOIN phase ON part.fkPhaseId = phase.id
        LEFT JOIN users ON bet.fkUserId = users.id
        WHERE phase.id=:phaseID
        ORDER BY parts ASC
    ) as select2
    GROUP BY select2.usernames";

$stmt = $db->prepare($query);

$stmt->bindParam(':phaseID', $faseId);

$stmt->execute();

$num = $stmt->rowCount();
if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível gerar a lista. (Error #AGAR1)"));
    exit();
}

$dbList = $stmt->fetchAll(PDO::FETCH_ASSOC);
$list = array();

foreach ($dbList as $row) {
    $partList = new stdClass;

    $partList->name = $row['usernames'];
    $partList->partesApostadas = $row['partsApostadas'];

    array_push($list, $partList);
}

$query2 = "SELECT GROUP_CONCAT(part.name ORDER BY part.id ASC SEPARATOR ',') as parts
    FROM phase 
    INNER JOIN part ON phase.id = part.fkPhaseId 
    WHERE phase.id=:phaseID";

$stmt2 = $db->prepare($query2);

$stmt2->bindParam(':phaseID', $faseId);

$stmt2->execute();

$num2 = $stmt2->rowCount();
if ($num2 <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível gerar a lista de partes do campeonato. (Error #AGAR2)"));
}

$dbParte = $stmt2->fetchAll(PDO::FETCH_ASSOC);
foreach ($dbParte as $row) {
    $partes = $row['parts'];
}

http_response_code(200);
echo json_encode(array(
    "listNames" => $list,
    "parts" => $partes
));
?>