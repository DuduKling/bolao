<?php
function getFixtures($parteId) {
    global $db;

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

}
?>
