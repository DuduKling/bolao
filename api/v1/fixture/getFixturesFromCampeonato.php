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

$query = "SELECT f.Id, f.score_homeTeam, b.name as home_name, b.imagePath as home_imagePath, f.score_awayTeam, a.name as away_name, a.imagePath as away_imagePath, f.dateTime, f.location 
    FROM fixture f
    INNER JOIN team a ON f.awayTeam_Id=a.Id 
    INNER JOIN team b ON f.homeTeam_Id=b.Id 
    INNER JOIN part ON f.part_id=part.Id
    INNER JOIN phase ON part.phase_Id=phase.Id
    INNER JOIN championship ON phase.championship_Id=championship.Id
    WHERE phase.Id=:phaseID ORDER BY f.Id ASC, dateTime ASC";

$stmt = $db->prepare($query);

$stmt->bindParam(':phaseID', $faseId);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar as partidas deste campeonato. Favor entrar em contato com o administrador. (Error #FGFFC1)"));
    exit();
}

$dbFixtures = $stmt->fetchAll(PDO::FETCH_ASSOC);

$fixtures = array();

foreach ($dbFixtures as $row) {
    $fixture = new stdClass;

    $fixture->idfixture = $row['Id'];
    $fixture->datetime = date("d/m/Y H:i", strtotime($row['dateTime']));
    $fixture->local = $row['location'];

    $fixture->home_score = $row['score_homeTeam'];
    $fixture->home_team_name = $row['home_name'];
    $fixture->home_path = $row['home_image'];

    $fixture->away_score = $row['score_awayTeam'];
    $fixture->away_team_name = $row['away_name'];
    $fixture->away_path = $row['away_image'];

    array_push($fixtures, $fixture);
}

http_response_code(200);
echo json_encode(array(
    "fixtures" => $fixtures
));
?>