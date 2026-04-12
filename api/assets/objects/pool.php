<?php

class Pool
{
    private $conn;
    private $env;
    public $model;

    public function __construct()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
        $this->conn = new DatabaseConnection();

        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
        $this->env = new Env();
    }

    public function getAll()
    {
        $query = "SELECT
                pool.*,
                GROUP_CONCAT(DISTINCT part.name SEPARATOR ', ') as parts,
                phase.name as phaseName,
                championship.name as championshipName,
                championship.logo as championshipLogo
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN phase ON phase.id = part.fkPhaseId
            INNER JOIN championship ON championship.id = phase.fkChampionshipId
            GROUP BY pool.id
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar os bolões. (Error #POO1)"
            ));
            exit();
        }

        $dbPools = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $pools = array();

        foreach ($dbPools as $row) {
            $pool = new stdClass;

            $pool->uuid = $row['uuid'];
            $pool->name = $row['name'];
            $pool->description = $row['description'];
            $pool->status = $row['status'];
            $pool->bets = $row['bets'];
            $pool->startDate = date_format(date_create($row['startDate']), 'd/m/Y');
            $pool->endDate = date_format(date_create($row['endDate']), 'd/m/Y');

            $pool->parts = $row['parts'];
            $pool->phaseName = $row['phaseName'];
            $pool->championshipName = $row['championshipName'];
            $pool->championshipLogo = $row['championshipLogo'];

            array_push($pools, $pool);
        }

        return $pools;
    }

    public function getUserJoinedPools($uuid)
    {
        $query = "SELECT pool.uuid
            FROM pool
            LEFT JOIN user_pool ON user_pool.fkPoolId = pool.id
            LEFT JOIN user ON user_pool.fkUserId = user.uuid
            WHERE user.uuid = :uuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':uuid', $uuid);

        $stmt->execute();

        $dbPools = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $uuidPools = array();

        foreach ($dbPools as $row) {
            array_push($uuidPools, $row['uuid']);
        }

        return $uuidPools;
    }
}
