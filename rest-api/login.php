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
 
// instantiate user object
$user = new User($db);
 

//---- check email existence here
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->email = $data->email;
$email_exists = $user->emailExists();
 

//---- files for jwt will be here
// generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 



//---- generate jwt will be here
// check if email exists and if password is correct
if($email_exists && password_verify($data->password, $user->password)){

    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "exp" => $exp,
       "data" => array(
           "id" => $user->id,
           "completename" => $user->completename,
           "email" => $user->email
       )
    );
    
    // set response code
    http_response_code(200);
 
    // generate jwt
    $jwt = JWT::encode($token, $key);
    $user->updateInternalInfo();
    echo json_encode(
        array(
            "message" => "Login efetuado com sucesso!",
            "jwt" => $jwt,
            "name" => $user->completename,
            "email" => $user->email,
            "imagePath" => $user->imagePath,
            "id" => $user->id
        )
    );
 
}

//---- login failed will be here
// login failed
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user login failed
    echo json_encode(array(
        "message" => "Não foi possível realizar o login. Email ou senha podem estar errados."
    ));
}
?>



