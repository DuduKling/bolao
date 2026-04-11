<?php
class User {
    private $conn;
    private $tableName = "users";

    public $name;
    public $phoneNumber;
    public $role;
    public $fingerprint;

    public $id;
    public $salt;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {

        // insert query
        $query = "INSERT INTO {$this->tableName}
                SET
                    name = :name,
                    phoneNumber = :phoneNumber,
                    passwd = :password,
                    salt = :salt";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phoneNumber = htmlspecialchars(strip_tags($this->phoneNumber));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // create a unique salt for this user
        $salt = uniqid(mt_rand(), true);

        // join the password and salt together, and hash them
        $password_hash = password_hash($this->fingerprint . $salt, PASSWORD_BCRYPT);

        // bind the values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':phoneNumber', $this->phoneNumber);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':salt', $salt);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function find() {
        $query = "SELECT *
            FROM {$this->tableName}
            WHERE name = :name
            AND phoneNumber = :phoneNumber
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':phoneNumber', $this->phoneNumber);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->phoneNumber = $row['phoneNumber'];
            $this->salt = $row['salt'];
            $this->role = $row['role'];

            return true;
        }

        return false;
    }

    public function checkIfExists() {

        // query to check if user exists
        $query = "SELECT *
                FROM {$this->tableName}
                WHERE name = :name
                AND phoneNumber = :phoneNumber
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phoneNumber = htmlspecialchars(strip_tags($this->phoneNumber));

        // bind given name value
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':phoneNumber', $this->phoneNumber);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if name exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {
            // return true because name exists in the database
            return true;
        }

        // return false if name does not exist in the database
        return false;
    }

    public function confirmAccess() {
        if (!$this->find()) {
            return false;
        }

        $passwordMatch = $this->matchPassword($this->fingerprint);

        if ($passwordMatch) {
            return true;
        }

        return false;
    }

    public function matchPassword($password) {
        $query = "SELECT salt, passwd
            FROM {$this->tableName}
            WHERE name = :name
            AND phoneNumber = :phoneNumber
            LIMIT 0,1";

        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phoneNumber = htmlspecialchars(strip_tags($this->phoneNumber));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':phoneNumber', $this->phoneNumber);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $salt = $row['salt'];
            $password_hash = $row['passwd'];

            return password_verify($password . $salt, $password_hash);
        }

        return false;
    }

    public function updatePassword() {
        if (!$this->find()) {
            return false;
        }

        $query = "UPDATE {$this->tableName}
            SET
                passwd = :password,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // hash the password before saving to database
        $password_hash = password_hash($this->fingerprint . $this->salt, PASSWORD_BCRYPT);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':password', $password_hash);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

}
?>