<?php

// ADD BETS FOR ALL FIXTURES
foreach ($_POST as $key => $value) {
    if ($key!="nome") {
        $fixture = str_replace("_", "", substr($key, 0, 2));
        $type = str_replace("_", "", substr($key, 2, 7));

        // // GET LAST EMPTY BET ID
        // $betid = "SELECT idbets FROM bets WHERE user_iduser={$userID} AND (bet_score_away IS NULL OR bet_score_home IS NULL) ORDER BY idbets ASC LIMIT 1";
        // $max1 =  mysqli_query($conn, $betid);
        // $row = mysqli_fetch_assoc($max1);
        // $idbet = $row['idbets'];

        if ($type=="home") {
            // GET LAST EMPTY BET ID
            $sql = "SELECT idbets FROM bets WHERE user_iduser={$userID} AND fixture_idfixture={$fixture} AND bet_score_home IS NULL ORDER BY idbets ASC LIMIT 1";
            $betid = $conn->query($sql);
            
            if ($betid->num_rows > 0) {
                $row = mysqli_fetch_assoc($betid);
                $idbet = $row['idbets'];

                // echo "FIXTURE: {$fixture} VALUE: {$value} type: {$type} ";
                // echo "USERID: {$userID} idbet: {$idbet} \n";

                $sql = "UPDATE bets SET bet_score_home={$value} WHERE idbets={$idbet} AND fixture_idfixture={$fixture}";
                if (mysqli_query($conn, $sql)) {
                    //echo "Record updated.. \n";
                } else {
                    echo "Oops! Algo de errado não está certo: {mysqli_error($conn)}";
                }
            }


        } elseif ($type=="away") {
            // GET LAST EMPTY BET ID
            $sql = "SELECT idbets FROM bets WHERE user_iduser={$userID} AND fixture_idfixture={$fixture} AND bet_score_away IS NULL ORDER BY idbets ASC LIMIT 1";
            $betid = $conn->query($sql);
            
            if ($betid->num_rows > 0) {
                $row = mysqli_fetch_assoc($betid);
                $idbet = $row['idbets'];

                // echo "FIXTURE: {$fixture} VALUE: {$value} type: {$type} ";
                // echo "USERID: {$userID} idbet: {$idbet} \n";

                $sql = "UPDATE bets SET bet_score_away={$value} WHERE idbets={$idbet} AND fixture_idfixture={$fixture}";
                if (mysqli_query($conn, $sql)) {
                    //echo "Record updated.. \n";
                } else {
                    echo "Oops! Algo de errado não está certo: {mysqli_error($conn)}";
                }
            }


        }
        
    }
}

echo "Success: Apostas registradas com sucesso!"

?>
