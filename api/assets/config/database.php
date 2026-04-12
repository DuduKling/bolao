<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

class DatabaseConnection
{
    public $conn = null;

    public function __construct()
    {
        $env = new Env();

        $host = $env->dbHost;
        $db_name = $env->dbName;
        $username = $env->dbUsername;
        $password = $env->dbPassword;

        $dsn = "mysql:host=" . $host . ";dbname=" . $db_name;

        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
    }

    public function prepare($query)
    {
        return $this->conn->prepare($query);
    }
}
