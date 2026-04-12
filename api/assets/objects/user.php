<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/models/user.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';

class User
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

    public function model($name, $phoneNumber)
    {
        $this->model = new UserModel();

        $this->model->name = $name;
        $this->model->phoneNumber = $phoneNumber;
    }

    public function create($fingerprint)
    {
        $query = "INSERT INTO {$this->model->table}
            SET
                name = :name,
                phoneNumber = :phoneNumber,
                passwd = :password,
                salt = :salt
        ";

        $stmt = $this->conn->prepare($query);

        $salt = uniqid(mt_rand(), true);
        $password_hash = password_hash($fingerprint . $salt, PASSWORD_BCRYPT);

        $stmt->bindParam(':name', $this->model->name);
        $stmt->bindParam(':phoneNumber', $this->model->phoneNumber);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':salt', $salt);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function generateToken()
    {
        $customJWT = new CustomJWT($this->env);

        return $customJWT->createToken(array(
            "name" => $this->model->name,
            "phoneNumber" => $this->model->phoneNumber,
            "createdAt" => date(DATE_ATOM)
        ));
    }

    public function find()
    {
        $query = "SELECT *
            FROM {$this->model->table}
            WHERE name = :name
            AND phoneNumber = :phoneNumber
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->model->name);
        $stmt->bindParam(':phoneNumber', $this->model->phoneNumber);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->model->id = $row['id'];
            $this->model->name = $row['name'];
            $this->model->phoneNumber = $row['phoneNumber'];
            $this->model->salt = $row['salt'];
            $this->model->role = $row['role'];

            return true;
        }

        return false;
    }

    public function exists()
    {
        $query = "SELECT *
            FROM {$this->model->table}
            WHERE name = :name
            AND phoneNumber = :phoneNumber
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->model->name);
        $stmt->bindParam(':phoneNumber', $this->model->phoneNumber);

        $stmt->execute();

        $num = $stmt->rowCount();

        if ($num > 0) {
            return true;
        }

        return false;
    }

    public function confirmAccess($fingerprint)
    {
        if (!$this->find()) {
            return false;
        }

        $passwordMatch = $this->matchPassword($fingerprint);

        if ($passwordMatch) {
            return true;
        }

        return false;
    }

    public function matchPassword($fingerprint)
    {
        $query = "SELECT salt, passwd
            FROM {$this->model->table}
            WHERE name = :name
            AND phoneNumber = :phoneNumber
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->model->name);
        $stmt->bindParam(':phoneNumber', $this->model->phoneNumber);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $salt = $row['salt'];
            $password_hash = $row['passwd'];

            return password_verify($fingerprint . $salt, $password_hash);
        }

        return false;
    }

    public function changePassword($fingerprint)
    {
        if (!$this->find()) {
            return false;
        }

        $query = "UPDATE {$this->model->table}
            SET
                passwd = :password,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = :id
        ";

        $stmt = $this->conn->prepare($query);

        $password_hash = password_hash($fingerprint . $this->model->salt, PASSWORD_BCRYPT);

        $stmt->bindParam(':id', $this->model->id);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

}
