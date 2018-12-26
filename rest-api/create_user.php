<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

//---- database connection will be here
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$user = new User($db);


//---- submitted data will be here
// get posted data
$data = json_decode(file_get_contents("php://input"));

 
// set product property values
$user->completename = $data->completename;
$user->email = $data->email;
$user->password = $data->password;

$email_exists = $user->CheckIfEmailExists();


//---- use the create() method here
// create the user
if($email_exists){
    http_response_code(400);
    
    echo json_encode(array("message" => "Este email já está sendo utilizado."));
}else{
    if($user->create()){
    
        // set response code
        http_response_code(200);
    
        // display message: user was created
        // echo json_encode(array("firstname" => $data->firstname));
        // echo json_encode(array("lastname" => $data->lastname));
        // echo json_encode(array("email" => $data->email));
        // echo json_encode(array("password" => $data->password));
        echo json_encode(array("message" => "Usuário criado com sucesso!"));
    }
    
    // message if unable to create user
    else{
    
        // set response code
        http_response_code(400);
    
        // display message: unable to create user
        echo json_encode(array("message" => "Não foi possível criar seu usuário. Favor entrar em contato com o Administrador."));
    }
}

?>
