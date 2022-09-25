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

$parteId = $inputData->parteID;
$newStatus = $inputData->newStatus;

$query = "UPDATE parte SET parte.status=:newStatus WHERE Id=:parteID";

$stmt = $db->prepare($query);

$stmt->bindParam(':newStatus', $newStatus, PDO::PARAM_STR);
$stmt->bindParam(':parteID', $parteId, PDO::PARAM_INT);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("message" => "Atualizado!"));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível atualizar esta parte do campeonato. (Error #ACCS1)"));
}
?>