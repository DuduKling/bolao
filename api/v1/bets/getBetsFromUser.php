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
$userName = $inputData->userName;

$query = "SELECT c.name as championship, fa.name as phase, u.imagePath as userImagePath, f.Id, bet.homeTeamScoreBet, tb.name as home_name, tb.imagePath as home_imagePath, bet.awayTeamScoreBet, ta.name as away_name, ta.imagePath as away_imagePath, f.dateTime, f.location, bet.points, f.homeTeamScore as final_scoreHome, f.awayTeamScore as final_scoreAway FROM bet
    INNER JOIN users u ON bet.fkUserId=u.Id
    INNER JOIN fixture f ON bet.fkFixtureId=f.Id
    INNER JOIN part p ON f.fkPartId=p.Id
    INNER JOIN phase fa ON p.fkPhaseId=fa.Id
    INNER JOIN championship c ON fa.fkChampionshipId=c.Id
    INNER JOIN team ta ON f.fkAwayTeamId=ta.Id 
    INNER JOIN team tb ON f.fkHomeTeamId=tb.Id
    WHERE fa.Id=:phaseID AND u.name=:userName";

$stmt = $db->prepare($query);

$stmt->bindParam(':userName', $userName);
$stmt->bindParam(':phaseID', $faseId);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar as apostas deste usuário. Favor entrar em contato com o Administrador. (Error #BGBFU1)"));
    exit();
}


$dbFixtures = $stmt->fetchAll(PDO::FETCH_ASSOC);

$fixtures = array();

foreach($dbFixtures as $row){
    $fixture = new stdClass;

    $fixture->idfixture = $row['Id'];
    $fixture->datetime = date("d/m/Y H:i", strtotime($row['dateTime']));
    $fixture->local = $row['location'];

    $fixture->home_score = $row['homeTeamScoreBet'];
    $fixture->home_team_name = $row['home_name'];
    $fixture->home_path = $row['home_imagePath'];

    $fixture->away_score = $row['awayTeamScoreBet'];
    $fixture->away_team_name = $row['away_name'];
    $fixture->away_path = $row['away_imagePath'];

    $fixture->final_scoreHome = $row['final_scoreHome'];
    $fixture->final_scoreAway = $row['final_scoreAway'];
    $fixture->points = $row['points'];

    array_push($fixtures, $fixture);

    $campeonato = $row['championship'];
    $fase = $row['phase'];
    $userImage = $row['userImagePath'];
}

http_response_code(200);
echo json_encode(array(
    "fixtures" => $fixtures,
    "championship" => $campeonato,
    "phase" => $fase,
    "userImagePath" => $userImage
));
?>