<?php
include 'connect.php';

// $sql = "SELECT SUM(points) as position, user.name, SUM(points) as points FROM bets INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture GROUP BY user.name ORDER BY points DESC, user.name ASC";

$faseNum = $_POST['fase'];

if ($faseNum != 0) {
    $sql = "SELECT SUM(points) as position, user.name, SUM(points) as points FROM bets INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture WHERE fixture.fase<>0 AND user.password<>'123' GROUP BY user.name ORDER BY points DESC, user.name ASC";
}else{
    $sql = "SELECT SUM(points) as position, user.name, SUM(points) as points FROM bets INNER JOIN user ON bets.user_iduser=user.iduser INNER JOIN fixture ON bets.fixture_idfixture=fixture.idfixture WHERE fixture.fase=0 AND user.password='123' GROUP BY user.name ORDER BY points DESC, user.name ASC";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $emparray = array();
    while($row = mysqli_fetch_assoc($result)) {
        $emparray[] = $row;
    }

    //echo "oi";
    //echo "EMPARRAY: {$emparray}";
    //$emparray2[] = json_encode($emparray);
    //echo "EMPARRAY JSON: {$emparray2}";
    echo json_encode($emparray);

} else {
    echo "0 results";
}
$conn->close();
?>