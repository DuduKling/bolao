<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$query = "SELECT * FROM campeonato";

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

    $campeonato->idCampeonato = $row['Id'];
    $campeonato->nomeCampeonato = $row['nome'];
    $campeonato->logoCampeonato = $row['logo'];
    $campeonato->dataInicioCampeonato = date_format($date = date_create($row['dataInicio']), 'd/m/Y');
    $campeonato->dataFimCampeonato = date_format(date_create($row['dataFim']), 'd/m/Y');

    // Fase
    $queryFase = "SELECT * FROM fase WHERE 
        campeonato_Id=:campeonatoID";

    $stmtFase = $db->prepare($queryFase);

    $stmtFase->bindParam(':campeonatoID', $row['Id']);

    $stmtFase->execute();
    $numFase = $stmtFase->rowCount();

    $fases = array();

    if ($numFase > 0) {
        $dbFases = $stmtFase->fetchAll(PDO::FETCH_ASSOC);

        foreach ($dbFases as $rowFase) {
            $fase = new stdClass;

            $fase->id = $rowFase['Id'];
            $fase->nomeFase = $rowFase['nome'];

            // Parte
            $queryParte = "SELECT * FROM parte WHERE 
                fase_Id=:faseID";

            $stmtParte = $db->prepare($queryParte);

            $stmtParte->bindParam(':faseID', $rowFase['Id']);

            $stmtParte->execute();
            $numParte = $stmtParte->rowCount();

            $partes = array();

            if ($numParte > 0) {
                $dbPartes = $stmtParte->fetchAll(PDO::FETCH_ASSOC);

                foreach ($dbPartes as $rowParte) {
                    $parte = new stdClass;

                    $parte->id = $rowParte['Id'];
                    $parte->nomeParte = $rowParte['nome'];
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
?>