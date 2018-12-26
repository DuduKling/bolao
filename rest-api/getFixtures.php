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
$parteId = $data->parteId;
$userId = $data->userId;


// Verifica se o usuário já apostou para a parte..
$query = "SELECT * FROM bet INNER JOIN fixture ON bet.fixture_Id=fixture.Id INNER JOIN parte ON fixture.parte_id=parte.Id WHERE parte.id=:parteID AND parte.status='true' AND users_Id=:userID";
$stmt = $db->prepare($query);

$stmt->bindParam(':parteID', $parteId);
$stmt->bindParam(':userID', $userId);

$stmt->execute();
$num = $stmt->rowCount();

if($num==0){
    // Se o usuário ainda não apostou..

    $query2 = "SELECT campeonato.nome as campeonato, fase.nome as fase, parte.nome as parte, f.Id, f.score_homeTeam, b.nome as home_nome, b.image as home_image, f.score_awayTeam, a.nome as away_nome, a.image as away_image, f.dateTime, f.local FROM fixture f
    INNER JOIN team a ON f.awayTeam_Id=a.Id 
    INNER JOIN team b ON f.homeTeam_Id=b.Id 
    INNER JOIN parte ON f.parte_id=parte.Id
    INNER JOIN fase ON parte.fase_Id=fase.Id
    INNER JOIN campeonato ON fase.campeonato_Id=campeonato.Id
    WHERE parte.id=:parteID AND parte.status='true' ORDER BY f.Id ASC, dateTime ASC";
    $stmt2 = $db->prepare($query2);
    
    $stmt2->bindParam(':parteID', $parteId);
    
    $stmt2->execute();
    $num2 = $stmt2->rowCount();
    
    if($num2>0){
        
        $dbFixtures = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        $fixtures = array();
    
        foreach($dbFixtures as $row){
            $fixture = new stdClass;
    
            $fixture->idfixture = $row['Id'];
            $fixture->datetime = date("d/m/Y H:i", strtotime($row['dateTime']));
            $fixture->local = $row['local'];
    
            $fixture->home_score = $row['score_homeTeam'];
            $fixture->home_team_name = $row['home_nome'];
            $fixture->home_path = $row['home_image'];
    
            $fixture->away_score = $row['score_awayTeam'];
            $fixture->away_team_name = $row['away_nome'];
            $fixture->away_path = $row['away_image'];
    
            array_push($fixtures, $fixture);
    
            $campeonato = $row['campeonato'];
            $fase = $row['fase'];
            $parte = $row['parte'];
        }
    
        
        http_response_code(200);
        echo json_encode(array(
            "fixtures" => $fixtures,
            "campeonato" => $campeonato,
            "fase" => $fase,
            "parte" => $parte
        ));
    
    }else{
        http_response_code(401);
        echo json_encode(array(
            "message" => "Partidas deste campeonato estão indisponíveis."
        ));
    }
}else{
    http_response_code(401);
    echo json_encode(array("message" => "Você já apostou para esta parte do campeonato!"));
}

?>
