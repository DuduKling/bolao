<?php
include 'connect.php';
include 'calcPoints.php';

// echo "#1 \n";

// $fixtures_from_post = array();

// TEST IF VALUES ARE NUMBER
$number = TRUE;
foreach ($_POST as $key => $value) {
    if (!preg_match("/^[0-9]{0,2}$/", $value)){
        $number = FALSE;
        echo 'Algum valor de aposta não está correto! Por favor verifique e tente novamente. ';
        break;
    }
}


// var_dump($_POST);

// $fixture = 0;
// $type = 0;
// $fixtureAnterior = 0;
// $typeAnterior = 0;

if ($number) {

    // echo "#2 \n";

    $ok = true;

    // ADD BETS FOR ALL FIXTURES
    foreach ($_POST as $key => $value) {
        $fixture = str_replace("_", "", substr($key, 0, 2));
        $type = str_replace("_", "", substr($key, 2, 7));
        // echo "fixture: {$fixture}";
        // echo "type: {$type}";
        // echo "fixtureANT: {$fixtureAnterior}";
        // echo "typeANT: {$typeAnterior}";


        // array_push($fixtures_from_post, $fixture);
        
        // echo "FIXTURE: {$fixture} VALUE: {$value} type: {$type} \n";

        // echo "$$$$$$$$$";

        if ($type=="home") {
            $sql = "UPDATE fixture SET home_score={$value} WHERE idfixture={$fixture}";
            
            if (mysqli_query($conn, $sql)) {
                // echo "Record updated.. \n";
            } else {
                echo "{mysqli_error($conn)}";
                $ok = false;
                break;
            }

        } elseif ($type=="away") {
            $sql = "UPDATE fixture SET away_score={$value} WHERE idfixture={$fixture}";

            if (mysqli_query($conn, $sql)) {
                // echo "Record updated.. \n";
            } else {
                echo "{mysqli_error($conn)}";
                $ok = false;
                break;
            }
        }

        if($fixtureAnterior == $fixture){
            // echo "É IGUAL";
            // echo "type: {$type}";
            if ($type=="home"){
                $updatePoints = updatePoints($fixture, $value, $valueAnterior);
            }else{
                $updatePoints = updatePoints($fixture, $valueAnterior, $value);
            }
            if ($updatePoints){
                echo "Success: Partidas e pontuações atualizadas!";
            }
        }

        $fixtureAnterior = $fixture;
        $typeAnterior = $type;
        $valueAnterior = $value;
    }

    if (!$ok){
        echo "Houston! Ocorreu um erro..";
    }
}

// $updatePoints = updatePoints();
// if ($updatePoints && $ok){
//     echo "Success: Partidas e pontuações atualizadas!";
// } else {
//     $updatePoints = $updatePoints ? '' : 'ERR#1';
//     $ok = $ok ? '' : 'ERR#2';
//     echo "Ocorreu um erro: {$updatePoints}.{$ok}";
// }

mysqli_close($conn);
?>
