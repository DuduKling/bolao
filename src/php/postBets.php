<?php
include 'connect.php';
include 'sec.php';

$userName = $_POST['nome'];


// TEST NAME:
$userNameTests = FALSE;
// echo "Username natural:\n{$userName}\n\n";
$userName = sec_input($userName);
// echo "Username limpo:\n{$userName}";
$userName = substr($userName, 0, 30);
// echo "Username cortado:\n{$userName}";


// TEST IF VALUES ARE NUMBER
$number = TRUE;
foreach ($_POST as $key => $value) {
    if ($key!="nome") {
        if (!preg_match("/^[0-9]{1,2}$/", $value)){
            $number = FALSE;
            echo 'Algum valor de aposta não está correto ou está faltando! Por favor verifique e tente novamente. ';
            break;
        }
    }
}

// echo $userNameTests ? 'true ' : 'false ';
// echo $number ? 'true ' : 'false ';

// echo "Fim TESTES.. ";

if ($number && $userNameTests) {

    // $sql = "SELECT * FROM user WHERE name='{$userName}'";
    // $result = $conn->query($sql);

    // // echo "#1 \n";

    // if ($result->num_rows == 0) {

        // INSERT NEW USER
        $password = 4;
        $sql = "INSERT INTO user(name, password) VALUES('{$userName}','{$password}')";
        //echo "#2 \n {$sql}";

        if (mysqli_query($conn, $sql)) {
            //echo "Novo usuário criado com sucesso \n";

            require 'prepareUser.php';

            include 'storeBets.php';

        } else {
            echo "ERROR #010: {mysqli_error($conn)}";
        }

    // } else {
    //     echo "Este usuário já existe!\n";
    // }

}


// echo "Fim sim! ";


// foreach ($_POST as $key => $value) {
//     echo "#0 \n";

//     if ($key=="nome") {
//         $sql = "SELECT * FROM user WHERE name='{$value}'";
//         $result = $conn->query($sql);
//         echo "#1 \n";

//         if ($result->num_rows == 0) {

//             // INSERT NEW USER
//             $sql = "INSERT INTO user(name, password) VALUES('{$value}','123')";
//             echo "#2 \n";

//             if (mysqli_query($conn, $sql)) {
//                 echo "New user successfully created \n";
//             } else {
//                 echo "".mysqli_error($conn)."";
//             }

//             // GET USER ID
//             $userGETid = "SELECT iduser FROM user WHERE name='{$value}'";
//             $num =  mysqli_query($conn, $userGETid);
//             $row = mysqli_fetch_assoc($num);
//             $userID = $row['iduser'];
//             echo "ID: {$userID} \n";

//             // GET NUMBER OF FIXTURES
//             $sql_num_fix = "SELECT count(idfixture) as num_fix FROM fixture";
//             $num =  mysqli_query($conn, $sql_num_fix);
//             $row = mysqli_fetch_assoc($num);
//             $num_fix = $row['num_fix'];
//             echo "NUMERO DE FIXTURES: ".$num_fix."\n";

//             // // GET LAST BET NUMBER
//             // $sql_id_bets = "SELECT MAX(idbets) as max_bet FROM bets";
//             // $num =  mysqli_query($conn, $sql_id_bets);
//             // $row = mysqli_fetch_assoc($num);
//             // $max_bet = $row['max_bet'];
//             // // echo "LAST BET: ".$max_bet."";

//             // CREATE BETS FOR ALL FIXTURES
//             for ($i = 1; $i <= $num_fix; $i++) {
//                 $sql = "INSERT INTO bets(user_iduser, fixture_idfixture) VALUES('{$userID}', '{$i}')";

//                 if (mysqli_query($conn, $sql)) {
//                     echo "New bet {$i} successfully created \n";
//                 } else {
//                     echo "".mysqli_error($conn)."";
//                 }
//             }
            
//         }else {
//             echo "Usuário {$value} já existe!";
//             break;
//         }

//     }
//     else {
//         // $bet = substr($key, 0, 1);
//         $type = substr($key, 2, 6);
//         $type2 = substr($key, 3, 7);

//         // GET LAST EMPTY BET ID
//         $betid = "SELECT idbets FROM bets WHERE user_iduser={$userID} AND (bet_score_away IS NULL OR bet_score_home IS NULL) LIMIT 1";
//         $max1 =  mysqli_query($conn, $betid);
//         $row = mysqli_fetch_assoc($max1);
//         $idbet = $row['idbets'];
        
//         echo "VALUE: {$value} USERID: {$userID} idbet: {$idbet} \n";
        
//         if ($type=="home" || $type2=="home") {
//             $sql = "UPDATE bets SET bet_score_home={$value} WHERE idbets={$idbet} AND user_iduser={$userID}";

//             if (mysqli_query($conn, $sql)) {
//                 echo "Record updated.. \n";
//             } else {
//                 echo "".mysqli_error($conn)."";
//             }
//         }elseif ($type=="away" || $type2=="away") {
//             $sql = "UPDATE bets SET bet_score_away={$value} WHERE idbets={$idbet} AND user_iduser={$userID}";

//             if (mysqli_query($conn, $sql)) {
//                 echo "Record updated.. \n";
//             } else {
//                 echo "".mysqli_error($conn)."";
//             }
//         }
//     }
// }


// var_dump($_POST);
// array(5) {
//     "1_home" => "2"
//     ["1_away"]=>
//     string(1) "1"
//     ["2_home"]=>
//     string(1) "3"
//     ["2_away"]=>
//     string(1) "4"
//     ["nome"]=>
//     string(4) "aaaa"
// }

mysqli_close($conn);
?>