<?php
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';
include 'util/fixtureGetter.php'; 

$database = new Database();
$db = $database->getConnection();


$data = json_decode(file_get_contents("php://input"));
$parteId = $data->parteId;

$userId = $data->userId;

if(!empty($userId)){
    
    // Verifica se o usuário já apostou para a parte..
    $query = "SELECT * FROM bet INNER JOIN fixture ON bet.fixture_Id=fixture.Id INNER JOIN parte ON fixture.parte_id=parte.Id WHERE parte.id=:parteID AND parte.status='true' AND users_Id=:userID";
    $stmt = $db->prepare($query);

    $stmt->bindParam(':parteID', $parteId);
    $stmt->bindParam(':userID', $userId);

    $stmt->execute();
    $num = $stmt->rowCount();

    if($num==0){
        // Se o usuário ainda não apostou..
        
        getFixtures($parteId);

        
    }else{
        http_response_code(401);
        echo json_encode(array("message" => "Você já apostou para esta parte do campeonato!"));
    }

}else{
    //Assume-se que é um Admin..
    getFixtures($parteId);
}

?>
