<?php
include_once 'config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';
$database = new Database();
$db = $database->getConnection($env);

include_once 'objects/user.php';
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$email_exists = $user->emailExists();

include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

if ($email_exists && password_verify($data->password, $user->password)) {

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

    http_response_code(200);

    $jwt = JWT::encode($token, $key);
    $user->updateInternalInfo();
    echo json_encode(
        array(
            "message" => "Login efetuado com sucesso!",
            "jwt" => $jwt,
            "name" => $user->completename,
            "email" => $user->email,
            "imagePath" => $user->imagePath,
            "userRole" => $user->role,
            "id" => $user->id
        )
    );
} else {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível realizar o login. Email ou senha podem estar errados."
    ));
}
?>
