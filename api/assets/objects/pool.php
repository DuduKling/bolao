<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/uuid.php';

class Pool
{
    private $conn;

    public function __construct()
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
        $this->conn = new DatabaseConnection();
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

        if (!$stmt->execute()) {
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

    public function get($poolUuid)
    {
        $query = "SELECT
                pool.*
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN phase ON phase.id = part.fkPhaseId
            INNER JOIN championship ON championship.id = phase.fkChampionshipId
            WHERE pool.uuid = :poolUuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar o bolão. (Error #POO3)"
            ));
            exit();
        }

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getPoolParts($poolUuid)
    {
        $query = "SELECT
                pool_part.*,
                part.*
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN phase ON phase.id = part.fkPhaseId
            INNER JOIN championship ON championship.id = phase.fkChampionshipId
            WHERE pool.uuid = :poolUuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar o bolão. (Error #POO6)"
            ));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($poolUuid, $poolInfo)
    {
        $query = "UPDATE pool
            SET
                name = :name,
                description = :description,
                status = :status,
                canMakeBet = :canMakeBet,
                canEditBet = :canEditBet,
                canViewOthersBet = :canViewOthersBet,
                startDate = :startDate,
                endDate = :endDate
            WHERE pool.uuid = :poolUuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);
        $stmt->bindParam(':name', $poolInfo->name);
        $stmt->bindParam(':description', $poolInfo->description);
        $stmt->bindParam(':status', $poolInfo->status);
        $stmt->bindParam(':canMakeBet', $poolInfo->canMakeBet);
        $stmt->bindParam(':canEditBet', $poolInfo->canEditBet);
        $stmt->bindParam(':canViewOthersBet', $poolInfo->canViewOthersBet);
        $stmt->bindParam(':startDate', $poolInfo->startDate);
        $stmt->bindParam(':endDate', $poolInfo->endDate);

        if (!$stmt->execute()) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível atualizar o bolão. (Error #POO4)"
            ));
            exit();
        }
    }

    public function create($poolInfo)
    {
        $query = "INSERT INTO pool
            SET
                uuid = :uuid,
                name = :name,
                description = :description,
                startDate = :startDate,
                endDate = :endDate
        ";

        $stmt = $this->conn->prepare($query);

        $uuid = guidv4();
        $stmt->bindParam(':uuid', $uuid);
        $stmt->bindParam(':name', $poolInfo->name);
        $stmt->bindParam(':description', $poolInfo->description);
        $stmt->bindParam(':startDate', $poolInfo->startDate);
        $stmt->bindParam(':endDate', $poolInfo->endDate);

        if (!$stmt->execute()) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível criar o bolão. (Error #POO5)"
            ));
            exit();
        }

        return array(
            'id' => $this->conn->lastInsertId(),
            'uuid' => $uuid
        );
    }

    public function joinParts($poolId, $partsSelected)
    {
        $query = "SELECT pool_part.fkPartId
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            WHERE pool.id = :poolId
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':poolId', $poolId);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $partsJoined = array();
        foreach ($rows as $row) {
            array_push($partsJoined, $row['fkPartId']);
        }

        foreach ($partsSelected as $partId => $partSelected) {
            if ($partSelected && !in_array($partId, $partsJoined)) {
                $query = "INSERT INTO pool_part
                    SET
                        fkPoolId = :poolId,
                        fkPartId = :partId
                ";

                $stmt = $this->conn->prepare($query);

                $stmt->bindParam(':poolId', $poolId);
                $stmt->bindParam(':partId', $partId);

                if (!$stmt->execute()) {
                    http_response_code(400);
                    echo json_encode(array(
                        "message" => "Não foi possível atualizar o bolão. (Error #POO5)"
                    ));
                    exit();
                }
            }
        }
    }

    public function getPoolChampionshipInfo($poolUuid)
    {
        $query = "SELECT
                pool.*,
                GROUP_CONCAT(DISTINCT part.name SEPARATOR ', ') as parts,
                phase.name as phaseName,
                championship.id as championshipId,
                championship.name as championshipName,
                championship.logo as championshipLogo
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN phase ON phase.id = part.fkPhaseId
            INNER JOIN championship ON championship.id = phase.fkChampionshipId
            WHERE pool.uuid = :poolUuid
            GROUP BY pool.id
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getPoolChampionshipInfoBetter($poolId)
    {
        $query = "SELECT
                championship.*
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN phase ON phase.id = part.fkPhaseId
            INNER JOIN championship ON championship.id = phase.fkChampionshipId
            WHERE pool.id = :poolId
            LIMIT 1
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':poolId', $poolId);
        $stmt->execute();
        $championshipRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$championshipRow) {
            return null;
        }

        $championshipId = $championshipRow['id'];

        $query = "SELECT
                phase.id as phaseId,
                phase.name as phaseName,
                part.id as partId,
                part.name as partName,
                pool_part.fkPoolId IS NOT NULL as isJoined
            FROM championship
            INNER JOIN phase ON phase.fkChampionshipId = championship.id
            INNER JOIN part ON part.fkPhaseId = phase.id
            LEFT JOIN pool_part ON pool_part.fkPartId = part.id AND pool_part.fkPoolId = :poolId
            WHERE championship.id = :championshipId
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':poolId', $poolId);
        $stmt->bindParam(':championshipId', $championshipId);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $championship = [
            'id' => $championshipRow['id'],
            'name' => $championshipRow['name'],
            'logo' => $championshipRow['logo'],
            'phases' => []
        ];

        $phases = [];
        foreach ($rows as $row) {
            $phaseId = $row['phaseId'];
            if (!isset($phases[$phaseId])) {
                $phases[$phaseId] = [
                    'id' => $phaseId,
                    'name' => $row['phaseName'],
                    'parts' => []
                ];
            }
            $phases[$phaseId]['parts'][] = [
                'id' => $row['partId'],
                'name' => $row['partName'],
                'isJoined' => (bool) $row['isJoined']
            ];
        }

        $championship['phases'] = array_values($phases);

        return $championship;
    }

    public function getChampionshipsInfo()
    {
        $query = "SELECT *
            FROM championship
            -- WHERE championship.endDate > NOW()
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $championshipRows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$championshipRows) {
            return null;
        }

        $championships = array();

        foreach ($championshipRows as $row) {

            $championshipId = $row['id'];

            $query = "SELECT
                phase.id as phaseId,
                phase.name as phaseName,
                part.id as partId,
                part.name as partName
            FROM championship
            INNER JOIN phase ON phase.fkChampionshipId = championship.id
            INNER JOIN part ON part.fkPhaseId = phase.id
            WHERE championship.id = :championshipId
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':championshipId', $championshipId);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $championship = [
                'id' => $row['id'],
                'name' => $row['name'],
                'logo' => $row['logo'],
                'phases' => []
            ];

            $phases = [];
            foreach ($rows as $row) {
                $phaseId = $row['phaseId'];
                if (!isset($phases[$phaseId])) {
                    $phases[$phaseId] = [
                        'id' => $phaseId,
                        'name' => $row['phaseName'],
                        'parts' => []
                    ];
                }
                $phases[$phaseId]['parts'][] = [
                    'id' => $row['partId'],
                    'name' => $row['partName']
                ];
            }

            $championship['phases'] = array_values($phases);

            array_push($championships, $championship);
        }

        return $championships;
    }

    public function getUserJoinedPools($userUuid)
    {
        $query = "SELECT pool.uuid
            FROM pool
            LEFT JOIN user_pool ON user_pool.fkPoolId = pool.id
            LEFT JOIN user ON user_pool.fkUserId = user.id
            WHERE user.uuid = :userUuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':userUuid', $userUuid);

        $stmt->execute();

        $dbPools = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $uuidPools = array();

        foreach ($dbPools as $row) {
            array_push($uuidPools, $row['uuid']);
        }

        return $uuidPools;
    }

    public function getData($uuid)
    {
        $query = "SELECT *
            FROM pool
            WHERE uuid = :uuid
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':uuid', $uuid);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getPoolFixtures($poolUuid)
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
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON pool_part.fkPartId = part.id
            INNER JOIN fixture ON fixture.fkPartId = part.id
            INNER JOIN team a ON fixture.fkAwayTeamId=a.id
            INNER JOIN team b ON fixture.fkHomeTeamId=b.id
            INNER JOIN phase ON part.fkPhaseId=phase.id
            INNER JOIN championship ON phase.fkChampionshipId=championship.id
            WHERE pool.uuid = :poolUuid
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserPoolBets($userId, $poolUuid)
    {
        $query = "SELECT fixture.id,
                bet.homeTeamScoreBet,
                bet.awayTeamScoreBet,
                points
            FROM bet
            INNER JOIN fixture ON bet.fkFixtureId = fixture.id
            INNER JOIN user_pool ON bet.fkUserPoolId = user_pool.id
            INNER JOIN pool ON user_pool.fkPoolId = pool.id
            WHERE pool.uuid = :poolUuid
            AND user_pool.fkUserId = :userId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);
        $stmt->bindParam(':userId', $userId);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function userHasJoined($userId, $poolId)
    {
        $query = "SELECT *
            FROM user_pool
            WHERE fkUserId = :userId
            AND fkPoolId = :poolId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':poolId', $poolId);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            return array(
                'joined' => true,
                'userPoolId' => $row['id']
            );
        }

        return array(
            'joined' => false
        );
    }

    public function joinUserInPool($userId, $poolId)
    {
        $query = "INSERT INTO user_pool
            SET
                fkUserId = :userId,
                fkPoolId = :poolId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':poolId', $poolId);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function validateBetsData($bets)
    {
        $allFieldOk = true;
        foreach ($bets as $fixtureId => $fixtureScore) {
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
                "message" => "Algum valor de aposta não está correto ou está faltando! Por favor verifique e tente novamente. (Error #BMB1)"
            ));
            exit();
        }
    }

    public function makeBets($userPoolId, $bets)
    {
        $error = false;

        foreach ($bets as $fixtureId => $fixtureScore) {
            $query = "INSERT INTO bet SET
                fkUserPoolId = :userPoolId,
                fkFixtureId = :fixtureId,
                homeTeamScoreBet = :betHome,
                awayTeamScoreBet = :betAway
            ";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':userPoolId', $userPoolId);
            $stmt->bindParam(':fixtureId', $fixtureId);
            $stmt->bindParam(':betHome', $fixtureScore[0]);
            $stmt->bindParam(':betAway', $fixtureScore[1]);

            if ($stmt->execute()) {
                $error = false;
            } else {
                $error = true;
                break;
            }
        }

        if ($error) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível realizar sua aposta. Favor entrar em contato com o Administrador. (Error #BMB2)"
            ));
            exit();
        }
    }

    public function getRank($poolId)
    {
        $query = "SELECT
                user.name,
                user.uuid,
                SUM(points) as points
            FROM bet
            INNER JOIN user_pool ON bet.fkUserPoolId = user_pool.id
            INNER JOIN user ON user_pool.fkUserId = user.id
            INNER JOIN pool ON user_pool.fkPoolId = pool.id
            WHERE pool.id = :poolId
            GROUP BY user.name
            ORDER BY
                points DESC,
                user.name ASC
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolId', $poolId);

        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível gerar o rank para este campeonato. Favor entrar em contato com o administrador. (Error #FGR1)"
            ));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getFixtureBets($poolId, $fixtureId)
    {
        $query = "SELECT
                    fixture.id,
                    bet.homeTeamScoreBet,
                    bet.awayTeamScoreBet,
                    GROUP_CONCAT(CONCAT(user.name, '#', user.uuid) ORDER BY user.name ASC SEPARATOR ',') as users
            FROM bet
            INNER JOIN user_pool ON bet.fkUserPoolId = user_pool.id
            INNER JOIN user ON user_pool.fkUserId = user.id
            INNER JOIN fixture ON bet.fkFixtureId = fixture.id
            WHERE fixture.id = :fixtureId
            AND user_pool.fkPoolId = :poolId
            GROUP BY
                bet.homeTeamScoreBet,
                bet.awayTeamScoreBet
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolId', $poolId);
        $stmt->bindParam(':fixtureId', $fixtureId);

        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num <= 0) {
            http_response_code(400);
            echo json_encode(array(
                "message" => "Não foi possível encontrar as apostas deste jogo. Favor entrar em contato com o Administrador. (Error #BGBFF1)"
            ));
            exit();
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPoolFixture($poolUuid, $fixtureId)
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
            FROM pool
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON pool_part.fkPartId = part.id
            INNER JOIN fixture ON fixture.fkPartId = part.id
            INNER JOIN team a ON fixture.fkAwayTeamId=a.id
            INNER JOIN team b ON fixture.fkHomeTeamId=b.id
            INNER JOIN phase ON part.fkPhaseId=phase.id
            INNER JOIN championship ON phase.fkChampionshipId=championship.id
            WHERE pool.uuid = :poolUuid
            AND fixture.id = :fixtureId
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);
        $stmt->bindParam(':fixtureId', $fixtureId);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUsersPoolParticipation($poolUuid)
    {
        $query = "SELECT
                user.name as name,
                part.name as part,
                count(bet.id) as countBets,
                count(fixture.id) as countFixtures
            FROM user
            INNER JOIN user_pool ON user.id = user_pool.fkUserId
            INNER JOIN pool ON user_pool.fkPoolId = pool.id
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN fixture ON fixture.fkPartId = part.id
            LEFT JOIN bet ON bet.fkFixtureId = fixture.id AND bet.fkUserPoolId = user_pool.id
            WHERE pool.uuid = :poolUuid
            GROUP BY user_pool.id, part.name
            ORDER BY part.id
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserBetParticipation($userId, $poolUuid)
    {
        $query = "SELECT
                part.name as part,
                count(bet.id) as countBets
            FROM user
            INNER JOIN user_pool ON user.id = user_pool.fkUserId
            INNER JOIN pool ON user_pool.fkPoolId = pool.id
            INNER JOIN pool_part ON pool_part.fkPoolId = pool.id
            INNER JOIN part ON part.id = pool_part.fkPartId
            INNER JOIN fixture ON fixture.fkPartId = part.id
            LEFT JOIN bet ON bet.fkFixtureId = fixture.id AND bet.fkUserPoolId = user_pool.id
            WHERE pool.uuid = :poolUuid
            AND user.id = :userId
            GROUP BY user_pool.id, part.name
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':poolUuid', $poolUuid);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
