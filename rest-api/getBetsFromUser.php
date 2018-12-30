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
$faseId = $data->faseID;
$userName = $data->userName;


$query = "SELECT c.nome as campeonato, fa.nome as fase, u.imagePath as userImage, f.Id, bet.bet_homeTeam, tb.nome as home_nome, tb.image as home_image, bet.bet_awayTeam, ta.nome as away_nome, ta.image as away_image, f.dateTime, f.local FROM bet
INNER JOIN users u ON bet.users_Id=u.Id
INNER JOIN fixture f ON bet.fixture_Id=f.Id
INNER JOIN parte p ON f.parte_id=p.Id
INNER JOIN fase fa ON p.fase_Id=fa.Id
INNER JOIN campeonato c ON fa.campeonato_Id=c.Id
INNER JOIN team ta ON f.awayTeam_Id=ta.Id 
INNER JOIN team tb ON f.homeTeam_Id=tb.Id
WHERE fa.Id=:faseID AND u.name=:userName";
$stmt = $db->prepare($query);

$stmt->bindParam(':userName', $userName);
$stmt->bindParam(':faseID', $faseId);

$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    
    $dbFixtures = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $fixtures = array();

    foreach($dbFixtures as $row){
        $fixture = new stdClass;

        $fixture->idfixture = $row['Id'];
        $fixture->datetime = date("d/m/Y H:i", strtotime($row['dateTime']));
        $fixture->local = $row['local'];

        $fixture->home_score = $row['bet_homeTeam'];
        $fixture->home_team_name = $row['home_nome'];
        $fixture->home_path = $row['home_image'];

        $fixture->away_score = $row['bet_awayTeam'];
        $fixture->away_team_name = $row['away_nome'];
        $fixture->away_path = $row['away_image'];

        array_push($fixtures, $fixture);

        $campeonato = $row['campeonato'];
        $fase = $row['fase'];
        $userImage = $row['userImage'];
    }
    
    http_response_code(200);
    echo json_encode(array(
        "fixtures" => $fixtures,
        "campeonato" => $campeonato,
        "fase" => $fase,
        "userImage" => $userImage
    ));

}else{
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível encontrar as apostas deste usuário. Favor entrar em contato com o Administrador."
    ));

}

?>
