<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$reqBody = json_decode(file_get_contents("php://input"));

$jwt = htmlspecialchars(strip_tags($reqBody->jwt));
$fingerprint = htmlspecialchars(strip_tags($reqBody->fingerprint));

if (!isset($jwt) || empty($jwt)) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Acesso Negado. Favor fazer login novamente. (Error: #VC1)
        "
    ));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User();

$decoded = $user->validateToken($jwt);
if (empty($decoded)) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Acesso Negado. (Error: #VC2)"
    ));
    exit();
}

$name = $decoded->data->name;
$phoneNumber = $decoded->data->phoneNumber;

$user->model($name, $phoneNumber);

$exists = $user->exists();

$hasAccess = $user->confirmAccess($fingerprint);
if (!$hasAccess) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível validar seu login, favor entrar em contato com o Administrador. (Error: #VC3)
        "
    ));
    exit();
}

http_response_code(200);
echo json_encode(
    array(
        "message" => "Cookie validado com sucesso!",
        "name" => $user->model->name,
        "phoneNumber" => $user->model->phoneNumber,
        "role" => $user->model->role,
        "jwt" => $user->generateToken(),
    )
);
