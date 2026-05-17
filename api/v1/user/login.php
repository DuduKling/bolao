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

$name = htmlspecialchars(strip_tags($reqBody->name));
$phoneNumber = htmlspecialchars(strip_tags($reqBody->phoneNumber));
$fingerprint = htmlspecialchars(strip_tags($reqBody->fingerprint));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$user->model($name, $phoneNumber);

$exists = $user->exists();
$passwordMatch = $user->matchPassword($fingerprint);

if (!$exists || !$passwordMatch) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível realizar o login. Nome ou telefone podem estar errados. Login em um dispositivo diferente? Tente novamente utilizando o link de \"Perdi o acesso\"."
    ));
    exit();
}

$user->find();

$jwt = $user->getToken();

$cookieOptions = array(
    "expires" => time() + 60 * 60 * 24 * 60, // 60 days
    "path" => "/",
    "domain" => $env->urlFrontHostOnly,
    "secure" => true,     // or false
    "httponly" => true,    // or false
    "samesite" => "Lax" // None || Lax  || Strict
);
setcookie('userJWT', $jwt, $cookieOptions);

http_response_code(200);
echo json_encode(array(
    "message" => "Login efetuado com sucesso!",
    "jwt" => $jwt,
));
