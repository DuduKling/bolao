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

$campeonatoId = $inputData->campeonatoID;

$query = "SELECT * FROM championship WHERE Id=:championshipID";

$stmt = $db->prepare($query);

$stmt->bindParam(':championshipID', $campeonatoId);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar este campeonato. Favor entrar em contato com o administrador. (Error #CGCI1)"));
    exit();
}

$dbCampeonato = $stmt->fetchAll(PDO::FETCH_ASSOC);
$campeonato = new stdClass;

foreach ($dbCampeonato as $row) {
    $campeonato->idCampeonato = $row['Id'];
    $campeonato->nomeCampeonato = $row['name'];
    $campeonato->logoCampeonato = $row['logo'];
    $campeonato->dataInicioCampeonato = date_format($date = date_create($row['startDate']), 'd/m/Y');

    // Fase
    $queryFase = "SELECT * FROM phase WHERE 
        championship_Id=:championshipID";

    $stmtFase = $db->prepare($queryFase);

    $stmtFase->bindParam(':championshipID', $row['Id']);

    $stmtFase->execute();
    $numFase = $stmtFase->rowCount();

    $fases = array();

    if ($numFase > 0) {
        $dbFases = $stmtFase->fetchAll(PDO::FETCH_ASSOC);

        foreach ($dbFases as $rowFase) {
            $fase = new stdClass;

            $fase->id = $rowFase['Id'];
            $fase->nomeFase = $rowFase['name'];

            // Parte
            $queryParte = "SELECT * FROM part WHERE 
                phase_Id=:phaseID";

            $stmtParte = $db->prepare($queryParte);

            $stmtParte->bindParam(':phaseID', $rowFase['Id']);

            $stmtParte->execute();
            $numParte = $stmtParte->rowCount();

            $partes = array();

            if ($numParte > 0) {
                $dbPartes = $stmtParte->fetchAll(PDO::FETCH_ASSOC);

                foreach ($dbPartes as $rowParte) {
                    $parte = new stdClass;

                    $parte->id = $rowParte['Id'];
                    $parte->nomeParte = $rowParte['name'];
                    $parte->statusParte = $rowParte['status'];

                    array_push($partes, $parte);
                }
            }

            $fase->partes = $partes;
            array_push($fases, $fase);
        }
    }

    $campeonato->fases = $fases;
}

http_response_code(200);
echo json_encode(array("campeonato" => $campeonato));
?>