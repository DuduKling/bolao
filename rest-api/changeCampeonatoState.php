<?php
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$parteId = $data->parteID;
$newStatus = $data->newStatus;
  
$query = "UPDATE parte SET parte.status=:newStatus WHERE Id=:parteID";
$stmt = $db->prepare($query);

$stmt->bindParam(':newStatus', $newStatus, PDO::PARAM_STR);
$stmt->bindParam(':parteID', $parteId, PDO::PARAM_INT);

if($stmt->execute()){
    http_response_code(200);
    echo json_encode(array("message" => "Atualizado!"));
}else{
    http_response_code(401);
    echo json_encode(array("message" => "Você já apostou para esta parte do campeonato!"));
}


?>
