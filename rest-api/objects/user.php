<?php
// 'user' object
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $id;
    public $completename;
    public $email;
    public $password;
    
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
 
    // create new user record
    function create(){
    
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :completename,
                    email = :email,
                    passwd = :password";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->completename=htmlspecialchars(strip_tags($this->completename));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
        
        // bind the values
        $stmt->bindParam(':completename', $this->completename);
        $stmt->bindParam(':email', $this->email);
    
        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function CheckIfEmailExists(){
        $query = "SELECT *
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        $stmt = $this->conn->prepare( $query );

        $this->email=htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(1, $this->email);

        $stmt->execute();

        $num = $stmt->rowCount();
    
        if($num>0){
            return true;
        }
        return false;
    }
    
    //---- emailExists() method will be here
    // check if given email exist in the database
    function emailExists(){
    
        // query to check if email exists
        $query = "SELECT id, name, passwd
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";
    
        // prepare the query
        $stmt = $this->conn->prepare( $query );
    
        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));
        
        // bind given email value
        $stmt->bindParam(1, $this->email);
    
        // execute the query
        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();
    
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
    
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // assign values to object properties
            $this->id = $row['id'];
            $this->completename = $row['name'];
            $this->password = $row['passwd'];
    
            // return true because email exists in the database
            return true;
        }
    
        // return false if email does not exist in the database
        return false;
    }
    
    //---- update() method will be here
    // update a user record
    public function update(){

        if(!empty($this->password)){
            $query = "UPDATE " . $this->table_name . "
                SET
                    passwd = :password
                WHERE id = :id";  
        }elseif(empty($this->email)){
            $query = "UPDATE " . $this->table_name . "
                SET
                    name = :completename
                WHERE id = :id";
        }elseif(empty($this->completename)){
            $query = "UPDATE " . $this->table_name . "
                SET
                    email = :email
                WHERE id = :id";
        }else{
            $query = "UPDATE " . $this->table_name . "
                SET
                    name = :completename,
                    email = :email
                WHERE id = :id";
        }
        
        // prepare the query
        $stmt = $this->conn->prepare($query);        
    
        // bind the values from the form
        if(!empty($this->completename)){
            $this->completename=htmlspecialchars(strip_tags($this->completename));
            $stmt->bindParam(':completename', $this->completename);
        }
        if(!empty($this->email)){
            $this->email=htmlspecialchars(strip_tags($this->email));
            $stmt->bindParam(':email', $this->email);
        }
    
        // hash the password before saving to database
        if(!empty($this->password)){
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }
        
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    public function updateInternalInfo(){
        $query = "SELECT name, email FROM users WHERE id = :id";
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $num = $stmt->rowCount();
        if($num>0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->completename = $row['name'];
            $this->email = $row['email'];
        }
    }

}