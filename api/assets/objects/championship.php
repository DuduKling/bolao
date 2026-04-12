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
}
