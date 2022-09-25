<?php
include 'connect.php';

// $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, home_score, away_score, b.name as home_team_name, b.flag_path as home_path, a.name as away_team_name, a.flag_path as away_path FROM fixture INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE fixture.fase = 0 ORDER BY datetime ASC, idfixture ASC";

$faseNum = $_POST['fase'];
$apostarS = $_POST['apostar'];

if ($faseNum != 0) {
    $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, home_score, away_score, b.name as home_team_name, b.flag_path as home_path, a.name as away_team_name, a.flag_path as away_path FROM fixture INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE fixture.fase<>0 ORDER BY idfixture ASC, datetime ASC";
}else{
    $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, home_score, away_score, b.name as home_team_name, b.flag_path as home_path, a.name as away_team_name, a.flag_path as away_path FROM fixture INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE fixture.fase=0 ORDER BY idfixture ASC, datetime ASC";
}

if($apostarS == 1){
    $sql = "SELECT idfixture, DATE_FORMAT(datetime, '%d/%m/%Y %H:%i') as datetime, local, home_score, away_score, b.name as home_team_name, b.flag_path as home_path, a.name as away_team_name, a.flag_path as away_path FROM fixture INNER JOIN team a ON fixture.away_team_idteam=a.idteam INNER JOIN team b ON fixture.home_team_idteam=b.idteam WHERE fixture.fase={$faseNum} ORDER BY idfixture ASC, datetime ASC";
}


$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

} else {
    echo "Sorry, 0 results";
}
$conn->close();
?>