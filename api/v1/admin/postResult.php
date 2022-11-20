<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$inputData = json_decode(file_get_contents("php://input"));

$allFieldOk = true;
foreach ($inputData as $value) {
    $homeScore = $value->home;
    $awayScore = $value->away;

    if (
        !preg_match("/^[0-9]{1,2}$/", $homeScore) ||
        !preg_match("/^[0-9]{1,2}$/", $awayScore)
    ) {
        $allFieldOk = false;
        break;
    }
}

if (!$allFieldOk) {
    http_response_code(400);
    echo json_encode(array("message" => "Algum valor de resultado não está correto ou está faltando! Por favor verifique e tente novamente. (Error #APR1)"));
    exit();
}

$fixture1 = 0;
$value1 = 0;

foreach ($inputData as $value) {
    $fixture = $value->fixture;
    $homeScore = $value->home;
    $awayScore = $value->away;

    $query = "UPDATE fixture
        SET
            score_homeTeam = :scoreHome,
            score_awayTeam = :scoreAway
        WHERE Id = :fixtureID";

    $stmt = $db->prepare($query);

    $stmt->bindParam(':scoreHome', $homeScore);
    $stmt->bindParam(':scoreAway', $awayScore);
    $stmt->bindParam(':fixtureID', $fixture);

    //PONTOS
    if ($stmt->execute()) {
        //ACERTOU
        $sql = "UPDATE bet
            SET points=3
            WHERE fixture_Id = :fixtureID
            AND (
                bet_homeTeam = :scoreHome
                AND bet_awayTeam = :scoreAway
            )";

        $stmt2 = $db->prepare($sql);

        $stmt2->bindParam(':scoreHome', $homeScore);
        $stmt2->bindParam(':scoreAway', $awayScore);
        $stmt2->bindParam(':fixtureID', $fixture);

        $stmt2->execute();

        // NÃO ACERTOU PLACAR / OU ACERTOU VENCEDOR (x2) / OU EMPATE
        $sql2 = "UPDATE bet
            SET points=1
            WHERE fixture_Id = :fixtureID
            AND NOT (
                bet_homeTeam = :scoreHome
                AND bet_awayTeam = :scoreAway
            )
            AND (
                (
                    :scoreHome > :scoreAway
                    AND bet_homeTeam > bet_awayTeam
                ) 
                OR (
                    :scoreHome < :scoreAway
                    AND bet_homeTeam < bet_awayTeam
                )
                OR (
                    :scoreHome = :scoreAway
                    AND bet_homeTeam = bet_awayTeam
                )
            )";

        $stmt3 = $db->prepare($sql2);

        $stmt3->bindParam(':scoreHome', $homeScore);
        $stmt3->bindParam(':scoreAway', $awayScore);
        $stmt3->bindParam(':fixtureID', $fixture);

        $stmt3->execute();
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Não foi possível realizar o cadastro do resultado. Favor entrar em contato com o Administrador. (Error #APR2)"));
        exit();
    }

}

http_response_code(200);
echo json_encode(array("message" => "Resultado e pontuação atualizados com sucesso!"));
exit();
