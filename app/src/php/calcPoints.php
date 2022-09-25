<?php
// echo "#1 \n";
function updatePoints($fixture, $home_score, $away_score) {
    global $conn;
    // echo "#2 \n";

    // echo "idfixture={$fixture}";
    // echo "home_score={$home_score}";
    // echo "away_score={$away_score}";

    //ACERTOU
    $sql = "UPDATE bets SET points=3 WHERE fixture_idfixture={$fixture} AND (bet_score_home={$home_score} AND bet_score_away={$away_score})";

    // echo "SQL 3: {$sql}";

    if (mysqli_query($conn, $sql)) {
        // echo "### FOI OS DE 3 PONTOS ###";
    } else {
        echo "{mysqli_error($conn)}";
    }

    // NÃO ACERTOU PLACAR / OU ACERTOU VENCEDOR (x2) / OU EMPATE
    $sql = "UPDATE bets SET points=1 WHERE fixture_idfixture={$fixture} 
    AND NOT(bet_score_home={$home_score} AND bet_score_away={$away_score}) 
    AND (({$home_score}>{$away_score} AND bet_score_home>bet_score_away) 
    OR ({$home_score}<{$away_score} AND bet_score_home<bet_score_away) 
    OR ({$home_score}={$away_score} AND bet_score_home=bet_score_away))";

    // echo "SQL 1: {$sql}";

    if (mysqli_query($conn, $sql)) {
        // echo "### FOI OS DE 1 PONTO ###";
    } else {
        echo "{mysqli_error($conn)}";
    }

    // if (/*Acertou o placar */$bet_score_home == $home_score && $bet_score_away == $away_score){
    //     $pontos = 3;
    // }elseif (/*Acertou vencedor home*/($home_score > $away_score && $bet_score_home > $bet_score_away)||/*Acertou vencedor away*/($home_score < $away_score && $bet_score_home < $bet_score_away)||/*Acertou sem vencedor (empate) */($home_score == $away_score && $bet_score_home == $bet_score_away)) {
    //     $pontos = 1;
    // }else {
    //     $pontos = 0;
    // }

    return true;

    // // var_dump($fixtures_from_post);
}

// // GET TOTAL USERS REGISTERED
//     $sql = "SELECT count(*) as totalUser FROM user";
//     $query = $conn->query($sql);
//     if ($query->num_rows > 0) {
//         $row = mysqli_fetch_assoc($query);
//         $totalUsers = $row['totalUser'];
//     } else {
//         echo "ERROR ADMIN #001 \n";
//     }

//     // echo "#2.1 \n";
//     // echo "totalUsers: {$totalUsers} \n";

//     // GET LAST USER REGISTERED'S ID
//     $sql = "SELECT iduser as finalUserID FROM user ORDER BY iduser DESC LIMIT 1";
//     $query = $conn->query($sql);
//     if ($query->num_rows > 0) {
//         $row = mysqli_fetch_assoc($query);
//         $finalUserID = $row['finalUserID'];
//     } else {
//         echo "ERROR ADMIN #010 \n";
//     }

//     // echo "#2.2 \n";
//     // echo "finalUserID: {$finalUserID} \n";

//     // GET FIXTURES
//     $sql = "SELECT count(idfixture) as numFixtures FROM fixture";
//     $query = $conn->query($sql);
//     if ($query->num_rows > 0) {
//         $row = mysqli_fetch_assoc($query);
//         $numFixtures = $row['numFixtures'];
//     } else {
//         echo "ERROR ADMIN #011 \n";
//     }

//     // echo "#2.3 \n";
//     // echo "numFixtures: {$numFixtures} \n";

//     /* ISSO AQUI DA ERRO SE ALGUM USUARIO FOR EXCLUIDO, QUEBRANDO A SEQUENCIA... */

//     // FOR EVERY USER
//     $firstUserID = $finalUserID - ($totalUsers-1);
//     // echo "firstUserID: {$firstUserID} \n";

//     for($i = $firstUserID; $i <= $finalUserID; $i++) {

//         // FOR EVERY FIXTURE
//         for($j = 1; $j <= $numFixtures; $j++){

//             // GET USER'S BETS
//             $sql = "SELECT bet_score_away, bet_score_home FROM bets WHERE user_iduser={$i} AND fixture_idfixture={$j}";
//             // echo "SQL {$sql}";
//             $query = $conn->query($sql);
//             if ($query->num_rows != 0) {
//                 $row = mysqli_fetch_assoc($query);
//                 $bet_score_away = $row['bet_score_away'];
//                 $bet_score_home = $row['bet_score_home'];  
//             } else {
//                 // echo "ERROR ADMIN #100 \n";
//                 echo "";
//             }

//             // GET FIXTURES SCORES
//             $sql = "SELECT away_score, home_score FROM fixture WHERE idfixture={$j}";
//             $query = $conn->query($sql);
//             if ($query->num_rows != 0) {
//                 $row = mysqli_fetch_assoc($query);
//                 $away_score = $row['away_score'];                
//                 $home_score = $row['home_score'];
//             } else {
//                 echo "ERROR ADMIN #101 \n";
//             }

//             // TEST FIXTURES SCORES
//             if($away_score == null || $home_score == null) {
//                 break;
//             }else {
//                 // CALCULATE POINTS
//                 $pontos = 0;
//                 // echo "bet_score_away: {$bet_score_away} | bet_score_home: {$bet_score_home} \n";
//                 // echo "away_score: {$away_score} | home_score: {$home_score} \n";

//                 if (/*Acertou o placar */$bet_score_home == $home_score && $bet_score_away == $away_score){
//                     $pontos = 3;
//                 }elseif (/*Acertou vencedor home*/($home_score > $away_score && $bet_score_home > $bet_score_away)||/*Acertou vencedor away*/($home_score < $away_score && $bet_score_home < $bet_score_away)||/*Acertou sem vencedor (empate) */($home_score == $away_score && $bet_score_home == $bet_score_away)) {
//                     $pontos = 1;
//                 }else {
//                     $pontos = 0;
//                 }

//                 // echo "Pontos: {$pontos} \n\n";

//                 $sql = "UPDATE bets SET points={$pontos} WHERE user_iduser={$i} AND fixture_idfixture={$j}";
//                 if (mysqli_query($conn, $sql)) {
//                     // echo "Record updated.. \n";
//                 } else {
//                     echo "{mysqli_error($conn)}";
//                 }
//             }
//         }
//     }
?>
