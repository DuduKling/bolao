<?php
function getFixtures($parteId, $statusAposta) {
    global $db;

    $query2 = "SELECT championship.name as championship, phase.name as phase, part.name as part, f.Id, f.homeTeamScore, b.name as home_name, b.imagePath as home_imagePath, f.awayTeamScore, a.name as away_name, a.imagePath as away_imagePath, f.dateTime, f.location FROM fixture f
        INNER JOIN team a ON f.fkAwayTeamId=a.Id 
        INNER JOIN team b ON f.fkHomeTeamId=b.Id 
        INNER JOIN part ON f.fkPartId=part.Id
        INNER JOIN phase ON part.fkPhaseId=phase.Id
        INNER JOIN championship ON phase.fkChampionshipId=championship.Id
        WHERE part.id=:partID AND part.status=:statusAposta ORDER BY f.Id ASC, dateTime ASC";

    $stmt2 = $db->prepare($query2);

    $stmt2->bindParam(':partID', $parteId);
    $stmt2->bindParam(':statusAposta', $statusAposta);

    $stmt2->execute();
    $num2 = $stmt2->rowCount();

    if ($num2 <= 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Partidas deste campeonato estão indisponíveis. (Error #UFG1)"));
        exit();
    }

    $dbFixtures = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    $fixtures = array();

    foreach ($dbFixtures as $row) {
        $fixture = new stdClass;

        $fixture->idfixture = $row['Id'];
        $fixture->datetime = date("d/m/Y H:i", strtotime($row['dateTime']));
        $fixture->local = $row['location'];

        $fixture->home_score = $row['homeTeamScore'];
        $fixture->home_team_name = $row['home_name'];
        $fixture->home_path = $row['home_imagePath'];

        $fixture->away_score = $row['awayTeamScore'];
        $fixture->away_team_name = $row['away_name'];
        $fixture->away_path = $row['away_imagePath'];

        array_push($fixtures, $fixture);

        $campeonato = $row['championship'];
        $fase = $row['phase'];
        $parte = $row['part'];
    }

    http_response_code(200);
    echo json_encode(array(
        "fixtures" => $fixtures,
        "championship" => $campeonato,
        "phase" => $fase,
        "part" => $parte
    ));
}
?>