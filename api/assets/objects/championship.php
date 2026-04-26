<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pointsStrategy.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pointsCalculatorDefault.php';

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

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getFixtures($championshipId)
    {
        $query = "SELECT
                fixture.id,
                phase.name as phaseName,
                part.name as partName,
                fixture.homeTeamScore,
                b.name as homeTeamName,
                b.imagePath as homeTeamImagePath,
                fixture.awayTeamScore,
                a.name as awayTeamName,
                a.imagePath as awayTeamImagePath,
                fixture.dateTime,
                fixture.location
            FROM fixture
            INNER JOIN team a ON fixture.fkAwayTeamId=a.id
            INNER JOIN team b ON fixture.fkHomeTeamId=b.id
            INNER JOIN part ON fixture.fkPartId=part.id
            INNER JOIN phase ON part.fkPhaseId=phase.id
            INNER JOIN championship ON phase.fkChampionshipId=championship.id
            WHERE championship.id=:championshipId
            ORDER BY
                fixture.id ASC,
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

    public function validateScoresData($scores)
    {
        $allFieldOk = true;
        foreach ($scores as $fixtureId => $fixtureScore) {
            foreach ($fixtureScore as $score) {
                if (!preg_match("/^[0-9]{1,2}$/", $score)) {
                    $allFieldOk = false;
                    break;
                }
            }
        }

        if (!$allFieldOk) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Algum valor de resultado não está correto ou está faltando! Por favor verifique e tente novamente. (Error #APR1)"
            ));
            exit();
        }
    }

    public function setFixtureScoreAndUpdateBetPoints($scores)
    {
        foreach ($scores as $fixtureId => $fixtureScore) {
            $this->setFixtureScore($fixtureId, $fixtureScore);
            $this->updateBetPoints($fixtureId, $fixtureScore);
        }
    }

    public function setFixtureScore($fixtureId, $fixtureScore)
    {
        $query = "UPDATE fixture
            SET
                homeTeamScore = :homeTeamScore,
                awayTeamScore = :awayTeamScore
            WHERE id = :fixtureId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':fixtureId', $fixtureId);
        $stmt->bindParam(':homeTeamScore', $fixtureScore[0]);
        $stmt->bindParam(':awayTeamScore', $fixtureScore[1]);

        $stmt->execute();
    }

    public function updateBetPoints($fixtureId, $fixtureScore)
    {
        $context = new PointsStrategy(new PointsCalculatorDefault($this->conn));
        $context->updatePoints($fixtureId, $fixtureScore);
    }
}
