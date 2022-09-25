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

$query = "SELECT select2.usernames, GROUP_CONCAT(select2.partes ORDER BY parteId ASC SEPARATOR ',') as partesApostadas
    FROM (
        SELECT DISTINCT users.name as usernames, parte.nome as partes, parte.Id as parteId FROM bet
        LEFT JOIN fixture ON bet.fixture_Id = fixture.Id
        LEFT JOIN parte ON fixture.parte_id = parte.Id
        LEFT JOIN fase ON parte.fase_Id = fase.Id
        LEFT JOIN users ON bet.users_Id = users.Id
        WHERE fase.Id=:faseID
        ORDER BY partes ASC
    ) as select2
    GROUP BY select2.usernames";

$stmt = $db->prepare($query);

$stmt->bindParam(':faseID', $faseId);

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
    $partList->partesApostadas = $row['partesApostadas'];

    array_push($list, $partList);
}

$query2 = "SELECT GROUP_CONCAT(parte.nome ORDER BY parte.Id ASC SEPARATOR ',') as partes
    FROM fase 
    INNER JOIN parte ON fase.Id = parte.fase_Id 
    WHERE fase.Id=:faseID";

$stmt2 = $db->prepare($query2);

$stmt2->bindParam(':faseID', $faseId);

$stmt2->execute();

$num2 = $stmt2->rowCount();
if ($num2 <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível gerar a lista de partes do campeonato. (Error #AGAR2)"));
}

$dbParte = $stmt2->fetchAll(PDO::FETCH_ASSOC);
foreach ($dbParte as $row) {
    $partes = $row['partes'];
}

http_response_code(200);
echo json_encode(array(
    "listNames" => $list,
    "partes" => $partes
));
?>