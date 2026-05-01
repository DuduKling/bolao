<?php

class Env
{
    public readonly string $urlFront;
    public readonly string $urlFrontHostOnly;
    public readonly string $dbHost;
    public readonly string $dbName;
    public readonly string $dbUsername;
    public readonly string $dbPassword;
    public readonly string $jwtPubKey;
    public readonly string $jwtPrivKey;
    public readonly string $jwtTimezone;

    public function __construct()
    {
        $envData = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/api/.env');

        $this->urlFront = $envData['URL_FRONT'];

        $hostOnly = $this->urlFront;
        if (str_contains($this->urlFront, '//')) {
            $urlPieces = explode("//", $this->urlFront);
            $hostOnly = $urlPieces[1];
        }
        if (str_contains($hostOnly, ':')) {
            $urlPieces = explode(":", $hostOnly);
            $hostOnly = $urlPieces[0];
        }
        $this->urlFrontHostOnly = $hostOnly;

        $this->dbHost = $envData['DB_HOST'];
        $this->dbName = $envData['DB_NAME'];
        $this->dbUsername = $envData['DB_USERNAME'];
        $this->dbPassword = $envData['DB_PASSWORD'];

        $this->jwtPubKey = $envData['JWT_PUB_KEY'];
        $this->jwtPrivKey = $envData['JWT_PRIV_KEY'];
        $this->jwtTimezone = $envData['JWT_TIMEZONE'];
    }
}
