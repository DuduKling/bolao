<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$reqBody = json_decode(file_get_contents("php://input"));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User($db);

$user->name = $reqBody->name;
$user->phoneNumber = $reqBody->phoneNumber;
$user->fingerprint = $reqBody->fingerprint;

$userExists = $user->checkIfExists();

if (!$userExists) {
    http_response_code(400);
    echo json_encode(array("message" => "Usuário não encontrado."));
    exit();
}

$passwordUpdated = $user->updatePassword();

if (!$passwordUpdated) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível liberar seu acesso. Favor entrar em contato com o Administrador."));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $customJWT->createToken(array(
    "name" => $user->name,
    "phoneNumber" => $user->phoneNumber,
    "createdAt" => date(DATE_ATOM)
));

http_response_code(200);
echo json_encode(
    array(
        "message" => "Usuário criado com sucesso!",
        "name" => $user->name,
        "phoneNumber" => $user->phoneNumber,
        "role" => $user->role,
        "jwt" => $jwt,
    )
);
?>