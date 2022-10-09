<?php
class User {
    private $conn;
    private $tableName = "users";

    public $id;
    public $completename;
    public $email;
    public $password;
    public $imagePath;
    public $role;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {

        // insert query
        $query = "INSERT INTO " . $this->tableName . "
                SET
                    name = :completename,
                    email = :email,
                    passwd = :password";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->completename = htmlspecialchars(strip_tags($this->completename));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // bind the values
        $stmt->bindParam(':completename', $this->completename);
        $stmt->bindParam(':email', $this->email);

        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function find($id) {
        $query = "SELECT *
            FROM users
            WHERE Id = ?
            LIMIT 0,1
        ";

        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($id));

        $stmt->bindParam(1, $id);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['Id'];
            $this->completename = $row['name'];
            $this->email = $row['email'];
            $this->password = $row['passwd'];
            $this->imagePath = $row['imagePath'];
            $this->role = $row['role'];

            return true;
        }

        return false;
    }

    public function CheckIfEmailExists() {

        // query to check if email exists
        $query = "SELECT *
                FROM " . $this->tableName . "
                WHERE email = ?
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['Id'];
            $this->completename = $row['name'];
            $this->email = $row['email'];
            $this->password = $row['passwd'];
            $this->imagePath = $row['imagePath'];
            $this->role = $row['role'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    public function updateInfo($name, $email) {

        $query = "UPDATE " . $this->tableName . "
            SET
                name = :completename,
                email = :email
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // bind the values from the form
        $this->completename = htmlspecialchars(strip_tags($name));
        $this->email = htmlspecialchars(strip_tags($email));

        $stmt->bindParam(':completename', $this->completename);
        $stmt->bindParam(':email', $this->email);

        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function updateAvatar($finalFileName) {

        $query = "UPDATE users SET
            imagePath = :imagePath
            WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':imagePath', $finalFileName);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function updatePassword($password) {

        $query = "UPDATE " . $this->tableName . "
            SET
                passwd = :password
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // hash the password before saving to database
        $this->password = htmlspecialchars(strip_tags($password));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(':password', $password_hash);

        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function updateInternalInfo() {
        $query = "SELECT name, email, imagePath, role FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->completename = $row['name'];
            $this->email = $row['email'];
            $this->imagePath = $row['imagePath'];
            $this->role = $row['role'];
        }
    }
}
?>