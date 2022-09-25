<?php
include 'connect.php';

$fixtureID = $_POST['fixture'];
$fase= $_POST['fase'];

// $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, b.name as home_team, b.flag_path as home_path, bet_score_home, a.name as away_team, a.flag_path as away_path, bet_score_away, user.name as username FROM bets INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE idfixture={$fixtureID} ORDER BY username ASC, datetime ASC, bets.idbets ASC";

if($fase = 0) {
    $password = 123;
}else if($fase = 1){
    $password = 222;
}else if($fase = 2){
    $password = 2;
}else if($fase = 3){
    $password = 3;
}else if($fase = 4){
    $password = 4;
}

$sql1 = "SELECT count(*) AS qtd FROM user WHERE password={$password}";

$result1 = $conn->query($sql1);

if ($result1->num_rows > 0) {

    $row = mysqli_fetch_assoc($result1);
    $totalUsers = $row['qtd'];

}else {
    echo "0 users";
}


$sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, b.name as home_team, b.flag_path as home_path, bet_score_home, a.name as away_team, a.flag_path as away_path, bet_score_away, round((count(*)/{$totalUsers} * 100),2) as porcentagem, GROUP_CONCAT(user.name ORDER BY user.name ASC SEPARATOR ',') as usernames FROM bets INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE idfixture={$fixtureID} GROUP BY bet_score_home, bet_score_away ORDER BY bet_score_home DESC, bet_score_away DESC";

// , concat(round(( count(*)/{$totalUsers} * 100 ),2),'%') as porcentagem

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