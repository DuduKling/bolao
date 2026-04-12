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
if ($exists) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Este nome de usuário já está sendo utilizado."
    ));
    exit();
}

$created = $user->create($fingerprint);
if (!$created) {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Não foi possível criar seu usuário. Favor entrar em contato com o Administrador."
    ));
    exit();
}

http_response_code(200);
echo json_encode(array(
    "message" => "Usuário criado com sucesso!",
    "name" => $user->model->name,
    "phoneNumber" => $user->model->phoneNumber,
    "role" => $user->model->role,
    "jwt" => $user->generateToken(),
));
