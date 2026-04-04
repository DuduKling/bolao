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

$fixtureID = $inputData->fixtureID;

$query = "SELECT f.Id, f.dateTime, f.location, tb.name as home_name, tb.imagePath as home_imagePath, bet.homeTeamScoreBet, ta.name as away_name, ta.imagePath as away_imagePath, bet.awayTeamScoreBet, round((count(*)/(SELECT count(*) FROM users INNER JOIN bet ON users.Id=bet.fkUserId WHERE bet.fkFixtureId=:fixtureID) * 100),2) as porcentagem, GROUP_CONCAT(u.name ORDER BY u.name ASC SEPARATOR ',') as usernames 
    FROM bet
    INNER JOIN users u ON bet.fkUserId=u.Id
    INNER JOIN fixture f ON bet.fkFixtureId=f.Id
    INNER JOIN team ta ON f.fkAwayTeamId=ta.Id 
    INNER JOIN team tb ON f.fkHomeTeamId=tb.Id
    WHERE f.Id=:fixtureID
    GROUP BY bet.homeTeamScoreBet, bet.awayTeamScoreBet 
    ORDER BY porcentagem DESC";

$stmt = $db->prepare($query);

$stmt->bindParam(':fixtureID', $fixtureID);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar as apostas deste jogo. Favor entrar em contato com o Administrador. (Error #BGBFF1)"));
    exit();
}

$dbFixtures = $stmt->fetchAll(PDO::FETCH_ASSOC);

$fixtures = array();
$countRows = 0;

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

    $fixture->usernames = $row['usernames'];
    $fixture->porcentagem = $row['porcentagem'];

    array_push($fixtures, $fixture);

    $fixture->frontID = $countRows;

    $countRows = $countRows + 1;
}

http_response_code(200);
echo json_encode(array("fixtures" => $fixtures));
?>