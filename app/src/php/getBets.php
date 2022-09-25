<?php
include 'connect.php';

$userName = $_POST['nome'];
$faseNum = $_POST['fase'];

// $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, b.name as home_team, b.flag_path as home_path, bet_score_home, a.name as away_team, a.flag_path as away_path, bet_score_away FROM bets INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam 
// WHERE user.name='{$userName}' ORDER BY datetime ASC, bets.idbets ASC";

if ($faseNum != 0) {
    $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, b.name as home_team, b.flag_path as home_path, bet_score_home, a.name as away_team, a.flag_path as away_path, bet_score_away, points, home_score, away_score FROM bets INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE user.name='{$userName}' AND fixture.fase<>0 ORDER BY idfixture ASC, datetime ASC";
}else{
    $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, b.name as home_team, b.flag_path as home_path, bet_score_home, a.name as away_team, a.flag_path as away_path, bet_score_away, points, home_score, away_score FROM bets INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE user.name='{$userName}' AND fixture.fase=0 ORDER BY idfixture ASC, datetime ASC";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

}else {
    echo "0 results";
}

$conn->close();
?>