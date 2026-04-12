<?php

class Championship
{
    private $conn;

    public function __construct()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
        $this->conn = new DatabaseConnection();
    }

    public function getAll()
    {
        $query = "SELECT * FROM championship";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array("message" => "Não foi possível encontrar os campeonatos. (Error #CGC1)"));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getInfo($championshipId)
    {
        $query = "SELECT *
            FROM championship
            WHERE championship.id=:championshipId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':championshipId', $championshipId);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar as partidas deste campeonato. Favor entrar em contato com o administrador. (Error #FGFFC1)"
            ));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFixtures($championshipId)
    {
        $query = "SELECT
                f.id,
                phase.name as phaseName,
                part.name as partName,
                f.homeTeamScore,
                b.name as homeTeamName,
                b.imagePath as homeTeamImagePath,
                f.awayTeamScore,
                a.name as awayTeamName,
                a.imagePath as awayTeamImagePath,
                f.dateTime,
                f.location
            FROM fixture f
            INNER JOIN team a ON f.fkAwayTeamId=a.id
            INNER JOIN team b ON f.fkHomeTeamId=b.id
            INNER JOIN part ON f.fkPartId=part.id
            INNER JOIN phase ON part.fkPhaseId=phase.id
            INNER JOIN championship ON phase.fkChampionshipId=championship.id
            WHERE championship.id=:championshipId
            ORDER BY
                f.id ASC,
                dateTime ASC
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':championshipId', $championshipId);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar as partidas deste campeonato. Favor entrar em contato com o administrador. (Error #FGFFC1)"
            ));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
