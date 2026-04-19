<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$reqBody = json_decode(file_get_contents("php://input"));

$name = htmlspecialchars(strip_tags($reqBody->name));
$phoneNumber = htmlspecialchars(strip_tags($reqBody->phoneNumber));
$fingerprint = htmlspecialchars(strip_tags($reqBody->fingerprint));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$user->model($name, $phoneNumber);

$exists = $user->exists();
if (!$exists) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Usuário não encontrado."
    ));
    exit();
}

$updated = $user->changePassword($fingerprint);
if (!$updated) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Não foi possível liberar seu acesso. Favor entrar em contato com o Administrador."
    ));
    exit();
}

$jwt = $user->getToken();

$cookieOptions = array(
    "expires" => time() + 60 * 60 * 24 * 30, // 30 days
    "path" => "/",
    "domain" => 'localhost',
    "secure" => true,     // or false
    "httponly" => true,    // or false
    "samesite" => "Strict" // None || Lax  || Strict
);
setcookie('userJWT', $jwt, $cookieOptions);

http_response_code(200);
echo json_encode(array(
    "message" => "Acesso alterado com sucesso!",
    "jwt" => $jwt,
));
