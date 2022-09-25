<?php
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';
// include_once 'objects/campeonato.php';
 
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$campeonatoId = $data->campeonatoID;

$query = "SELECT * FROM campeonato WHERE Id=:campeonatoID";
$stmt = $db->prepare($query);

$stmt->bindParam(':campeonatoID', $campeonatoId);

$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $dbCampeonato = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $campeonato = new stdClass;

    foreach($dbCampeonato as $row){
        $campeonato->idCampeonato = $row['Id'];
        $campeonato->nomeCampeonato = $row['nome'];
        $campeonato->logoCampeonato = $row['logo'];
        $campeonato->dataInicioCampeonato = date_format($date = date_create($row['dataInicio']), 'd/m/Y');
        // $campeonato->dataFimCampeonato = date_format(date_create($row['dataFim']), 'd/m/Y');
        // $campeonato->statusCampeonato = $row['status'];

        // Fase
        $queryFase = "SELECT * FROM fase WHERE 
            campeonato_Id=:campeonatoID
        ";
        $stmtFase = $db->prepare($queryFase);

        $stmtFase->bindParam(':campeonatoID', $row['Id']);

        $stmtFase->execute();
        $numFase = $stmtFase->rowCount();
        $fases = array();

        if($numFase>0){
            $dbFases = $stmtFase->fetchAll(PDO::FETCH_ASSOC);
            foreach($dbFases as $rowFase){
                $fase = new stdClass;

                $fase->id = $rowFase['Id'];
                $fase->nomeFase = $rowFase['nome'];
                // $fase->apostaFase = $rowFase['status'];


                // Parte
                $queryParte = "SELECT * FROM parte WHERE 
                    fase_Id=:faseID
                ";
                $stmtParte = $db->prepare($queryParte);

                $stmtParte->bindParam(':faseID', $rowFase['Id']);

                $stmtParte->execute();
                $numParte = $stmtParte->rowCount();
                $partes = array();

                if($numParte>0){
                    $dbPartes = $stmtParte->fetchAll(PDO::FETCH_ASSOC);
                    foreach($dbPartes as $rowParte){
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
    }
    
    http_response_code(200);
    echo json_encode(array("campeonato" => $campeonato));
}else{
    http_response_code(401);
    echo json_encode(array("message" => "Não foi possível encontrar este campeonato. Favor entrar em contato com o administrador."));
}


?>



