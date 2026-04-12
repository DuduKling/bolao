<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$reqBody = json_decode(file_get_contents("php://input"));

$fingerprint = htmlspecialchars(strip_tags($reqBody->fingerprint));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

$name = $decoded->data->name;
$phoneNumber = $decoded->data->phoneNumber;

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$user->model($name, $phoneNumber);

$exists = $user->exists();

$hasAccess = $user->confirmAccess($fingerprint);
if (!$hasAccess) {
    $cookieOptions = array(
        "expires" => time() - 3600,
        "path" => "/",
        "domain" => 'localhost',
        "secure" => true,     // or false
        "httponly" => true,    // or false
        "samesite" => "Strict" // None || Lax  || Strict
    );
    setcookie("userJWT", "", $cookieOptions);
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível validar seu login, favor entrar em contato com o Administrador. (Error: #AV3)"
    ));
    exit();
}

$jwt = $user->generateToken();

$cookieOptions = array(
    "expires" => time() + 3600,
    "path" => "/",
    "domain" => 'localhost',
    "secure" => true,     // or false
    "httponly" => true,    // or false
    "samesite" => "Strict" // None || Lax  || Strict
);
setcookie('userJWT', $jwt, $cookieOptions);

http_response_code(200);
echo json_encode(array(
    "message" => "Cookie validado com sucesso!",
    "name" => $user->model->name,
    "phoneNumber" => $user->model->phoneNumber,
    "role" => $user->model->role,
    "jwt" => $jwt,
));
