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

$userID = $inputData->userId;

$allFieldOk = true;
foreach ($inputData as $key => $value) {
    if ($key != "userId" && !preg_match("/^[0-9]{1,2}$/", $value)) {
        $allFieldOk = false;
        break;
    }
}

if (!$allFieldOk) {
    http_response_code(400);
    echo json_encode(array("message" => "Algum valor de aposta não está correto ou está faltando! Por favor verifique e tente novamente. (Error #BMB1)"));
    exit();
}

$noProblems=true;
$fixture1 = 0;
$value1 = 0;

foreach ($inputData as $key => $value) {
    $fixture = str_replace("_", "", substr($key, 0, 2));
    $type = str_replace("_", "", substr($key, 2, 7));

    // considerando que o home sempre vem antes do away:
    if ($type == "home") {
        $fixture1 = $fixture;
        $value1 = $value;
    } elseif ($type == "away" && $fixture == $fixture1) {
        $query = "INSERT INTO bet SET
            users_Id = :userID,
            fixture_Id = :fixtureID,
            bet_homeTeam = :betHome,
            bet_awayTeam = :betAway";

        $stmt = $db->prepare($query);

        $stmt->bindParam(':userID', $userID);
        $stmt->bindParam(':fixtureID', $fixture);
        $stmt->bindParam(':betHome', $value1);
        $stmt->bindParam(':betAway', $value);

        if ($stmt->execute()) {
            $noProblems=true;
        } else {
            $noProblems=false;
            break;
        }
    }
}

if ($noProblems) {
    http_response_code(200);
    echo json_encode(array("message" => "Aposta realizada com sucesso!"));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível realizar sua aposta. Favor entrar em contato com o Administrador. (Error #BMB2)"));
}
?>