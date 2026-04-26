<?php

class PointsCalculatorDefault implements IPointsStrategy
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function calculatePoints($fixtureId, $fixtureScore): void
    {
        // Acertou o placar
        $this->setPointsCorrectScore($fixtureId, $fixtureScore);

        // Acertou o vencedor ou empate
        $this->setPointsCorrectWinner($fixtureId, $fixtureScore);
    }

    private function setPointsCorrectScore($fixtureId, $fixtureScore)
    {
        $query = "UPDATE bet
            SET points = 3
            WHERE fkFixtureId = :fixtureId
            -- Acertou o placar
            AND (
                homeTeamScoreBet = :homeTeamScore
                AND awayTeamScoreBet = :awayTeamScore
            )
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':homeTeamScore', $fixtureScore[0]);
        $stmt->bindParam(':awayTeamScore', $fixtureScore[1]);
        $stmt->bindParam(':fixtureId', $fixtureId);

        $stmt->execute();
    }

    private function setPointsCorrectWinner($fixtureId, $fixtureScore)
    {
        $query = "UPDATE bet
            SET points = 1
            WHERE fkFixtureId = :fixtureId
            -- Não acertou o placar
            AND NOT (
                homeTeamScoreBet = :homeTeamScore
                AND awayTeamScoreBet = :awayTeamScore
            )
            AND (
                -- Acertou vencedor é home
                (
                    :homeTeamScore > :awayTeamScore
                    AND homeTeamScoreBet > awayTeamScoreBet
                ) OR
                -- Acertou vencedor é away
                (
                    :homeTeamScore < :awayTeamScore
                    AND homeTeamScoreBet < awayTeamScoreBet
                ) OR
                -- Acertou empate
                (
                    :homeTeamScore = :awayTeamScore
                    AND homeTeamScoreBet = awayTeamScoreBet
                )
            )
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':homeTeamScore', $fixtureScore[0]);
        $stmt->bindParam(':awayTeamScore', $fixtureScore[1]);
        $stmt->bindParam(':fixtureId', $fixtureId);

        $stmt->execute();
    }

}
