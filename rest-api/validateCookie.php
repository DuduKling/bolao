<?php
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';
include_once 'objects/user.php';

include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 

$database = new Database();
$db = $database->getConnection();
 
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";
 
if($jwt){
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        $user->id = $decoded->data->id;

        $user->updateInternalInfo();

        http_response_code(200);
        echo json_encode(
            array(
                "message" => "Cookie validado com sucesso!",
                "jwt" => $jwt,
                "name" => $user->completename,
                "email" => $user->email,
                "userImg" => $user->imagePath,
                "id" => $user->id
            )
        );
    }catch(Exception $e){
        http_response_code(401);
        echo json_encode(array(
            "message" => "JWT não decodificado",
            "error" => $e->getMessage()
        ));
    }

}else{
    http_response_code(401);
    echo json_encode(array("message" => "Access denied."));
}

?>



