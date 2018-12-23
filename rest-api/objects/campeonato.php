<?php

class Campeonato{
 
    // database connection and table name
    private $conn;
    private $table_name = "campeonato";
 
    // object properties
    public $id;
    public $nome;
    public $logo;
    public $dataInicio;
    public $dataFim;
    public $status;
    
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
    
    public function getCampeonatoById(){
    
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
}
