<?php
class DatabaseConnection {
    public $conn = null;

    public function __construct($env) {
        $host = $env["DB_HOST"];
        $db_name = $env["DB_NAME"];
        $username = $env["DB_USERNAME"];
        $password = $env["DB_PASSWORD"];

        $dsn = "mysql:host=" . $host . ";dbname=" . $db_name;

        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    public function prepare($query) {
        return $this->conn->prepare($query);
    }
}
?>