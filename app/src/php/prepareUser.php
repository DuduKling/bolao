<?php

//echo "#2.1: ";

// GET USER ID
$userGETid = "SELECT iduser FROM user WHERE name='{$userName}' AND password='{$password}'";
//echo "{$userGETid}";
$num = $conn->query($userGETid);

if ($num->num_rows != 0) {

    $row = mysqli_fetch_assoc($num);
    $userID = $row['iduser'];

    //echo "ID: {$userID} \n";


    // GET NUMBER OF FIXTURES
    $sql_num_fix = "SELECT count(idfixture) as num_fix FROM fixture WHERE fase=4";
    $num = $conn->query($sql_num_fix);

    if ($num->num_rows != 0) {

        $row = mysqli_fetch_assoc($num);
        $num_fix = $row['num_fix'];

        //echo "NUMERO DE FIXTURES: {$num_fix} \n";
        
        // CREATE BETS FOR ALL FIXTURES
        $fixtureInicial = 63;
        $num_fix = $num_fix + $fixtureInicial - 1;
        for ($i = $fixtureInicial; $i <= $num_fix; $i++) {
            $sql = "INSERT INTO bets(user_iduser, fixture_idfixture) VALUES('{$userID}', '{$i}')";

            if (mysqli_query($conn, $sql)) {
                // echo "New bet {$i} successfully created \n";
            } else {
                echo "ERROR #101: {mysqli_error($conn)}";
            }
        }

    } else {
        echo "ERROR #100 \n";
    }


} else {
    echo "ERROR #011 \n";
}

?>