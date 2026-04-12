<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$query = "SELECT * FROM championship";

$stmt = $db->prepare($query);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar os campeonatos. (Error #CGC1)"));
    exit();
}

$dbCampeonatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
$campeonatos = array();

foreach ($dbCampeonatos as $row) {
    $campeonato = new stdClass;

    $campeonato->idCampeonato = $row['id'];
    $campeonato->nomeCampeonato = $row['name'];
    $campeonato->logoCampeonato = $row['logo'];
    $campeonato->dataInicioCampeonato = date_format($date = date_create($row['startDate']), 'd/m/Y');
    $campeonato->dataFimCampeonato = date_format(date_create($row['endDate']), 'd/m/Y');

    // Fase
    $queryFase = "SELECT * FROM phase WHERE 
        fkChampionshipId=:championshipID";

    $stmtFase = $db->prepare($queryFase);

    $stmtFase->bindParam(':championshipID', $row['id']);

    $stmtFase->execute();
    $numFase = $stmtFase->rowCount();

    $fases = array();

    if ($numFase > 0) {
        $dbFases = $stmtFase->fetchAll(PDO::FETCH_ASSOC);

        foreach ($dbFases as $rowFase) {
            $fase = new stdClass;

            $fase->id = $rowFase['id'];
            $fase->nomeFase = $rowFase['name'];

            // Parte
            $queryParte = "SELECT * FROM part WHERE 
                fkPhaseId=:phaseID";

            $stmtParte = $db->prepare($queryParte);

            $stmtParte->bindParam(':phaseID', $rowFase['id']);

            $stmtParte->execute();
            $numParte = $stmtParte->rowCount();

            $partes = array();

            if ($numParte > 0) {
                $dbPartes = $stmtParte->fetchAll(PDO::FETCH_ASSOC);

                foreach ($dbPartes as $rowParte) {
                    $parte = new stdClass;

                    $parte->id = $rowParte['id'];
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
    array_push($campeonatos, $campeonato);
}

http_response_code(200);
echo json_encode($campeonatos);
