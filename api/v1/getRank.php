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
$faseId = $data->faseID;


$query = "SELECT SUM(points) as position, users.name, SUM(points) as points FROM bet
INNER JOIN users ON bet.users_Id=users.Id
INNER JOIN fixture ON bet.fixture_Id=fixture.Id
INNER JOIN parte ON fixture.parte_id=parte.Id
INNER JOIN fase ON parte.fase_Id=fase.Id
WHERE fase.Id=:faseID
GROUP BY users.name ORDER BY points DESC, users.name ASC";
$stmt = $db->prepare($query);

$stmt->bindParam(':faseID', $faseId);

$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $dbRanks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $rank = array();

    foreach($dbRanks as $row){
        $userRank = new stdClass;

        $userRank->position = $row['position'];
        $userRank->name = $row['name'];
        $userRank->points = $row['points'];

        array_push($rank, $userRank);
    }
    
    http_response_code(200);
    echo json_encode(array(
        "rank" => $rank
    ));

}else{
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível gerar o rank para este campeonato. Favor entrar em contato com o administrador."
    ));
}


?>
