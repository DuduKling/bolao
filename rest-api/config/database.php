<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;

    public $conn;

    public function getConnection($env){
        $this->host = $env["DB_HOST"];
        $this->db_name = $env["DB_NAME"];
        $this->username = $env["DB_USERNAME"];
        $this->password = $env["DB_PASSWORD"];

        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>