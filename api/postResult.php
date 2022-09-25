<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';
include 'util/fixtureGetter.php'; 

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));


$allFieldOk = true;
foreach ($data as $key => $value) {
    if ($key!="userId" && !preg_match("/^[0-9]{1,2}$/", $value)){
        $allFieldOk = false;
        break;
    }
}

$fixture1 = 0;
$value1 = 0;
if($allFieldOk){
    foreach($data as $key => $value){
        $fixture = str_replace("_", "", substr($key, 0, 2));
        $type = str_replace("_", "", substr($key, 2, 7));

        // considerando que o home sempre vem antes do away:
        if ($type=="home"){
            $fixture1 = $fixture;
            $value1 = $value;

        }elseif($type=="away" && $fixture==$fixture1){

            $query = "UPDATE fixture SET
                score_homeTeam = :scoreHome,
                score_awayTeam = :scoreAway
                WHERE Id = :fixtureID
            ";
            
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(':scoreHome', $value1);
            $stmt->bindParam(':scoreAway', $value);
            $stmt->bindParam(':fixtureID', $fixture);
            
            if($stmt->execute()){
                
                //PONTOS:

                //ACERTOU
                $sql = "UPDATE bet SET points=3 WHERE
                    fixture_Id = :fixtureID AND 
                    (bet_homeTeam = :scoreHome AND 
                    bet_awayTeam = :scoreAway)
                ";
                $stmt2 = $db->prepare($sql);
                $stmt2->bindParam(':scoreHome', $value1);
                $stmt2->bindParam(':scoreAway', $value);
                $stmt2->bindParam(':fixtureID', $fixture);
                $stmt2->execute();

                // NÃO ACERTOU PLACAR / OU ACERTOU VENCEDOR (x2) / OU EMPATE
                $sql2 = "UPDATE bet SET points=1 WHERE 
                    fixture_Id = :fixtureID AND 
                    NOT(
                        bet_homeTeam = :scoreHome AND 
                        bet_awayTeam = :scoreAway
                        ) AND 
                    (
                        (
                            :scoreHome>:scoreAway AND bet_homeTeam>bet_awayTeam
                        ) 
                        OR (
                            :scoreHome<:scoreAway AND 
                            bet_homeTeam<bet_awayTeam
                        ) 
                        OR (
                            :scoreHome=:scoreAway AND bet_homeTeam=bet_awayTeam
                        )
                    )
                ";
                $stmt3 = $db->prepare($sql2);
                $stmt3->bindParam(':scoreHome', $value1);
                $stmt3->bindParam(':scoreAway', $value);
                $stmt3->bindParam(':fixtureID', $fixture);
                $stmt3->execute();
                
                http_response_code(200);
                echo json_encode(array("message" => "Resultado e pontuação atualizados com sucesso!"));
            }else{
                http_response_code(400);
                echo json_encode(array("message" => "Não foi possível realizar o cadastro do resultado. Favor entrar em contato com o Administrador."));
                break;
            }
        }
    }
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Algum valor de resultado não está correto ou está faltando! Por favor verifique e tente novamente."));
}

?>
