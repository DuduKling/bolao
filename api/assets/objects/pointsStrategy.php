<?php

interface IPointsStrategy
{
    public function calculatePoints($fixtureId, $fixtureScore): void;
}

class PointsStrategy
{
    private $strategy;

    public function __construct(IPointsStrategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function setStrategy(IPointsStrategy $strategy)
    {
        $this->strategy = $strategy;
    }

    public function updatePoints($fixtureId, $fixtureScore): void
    {
        $this->strategy->calculatePoints($fixtureId, $fixtureScore);
    }
}
