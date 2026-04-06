<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$reqBody = json_decode(file_get_contents("php://input"));

if (!isset($reqBody->jwt) || empty($reqBody->jwt)) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente. (Error: #VC1)"));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $reqBody->jwt;
$decoded = $customJWT->decodeToken($jwt);

if (empty($decoded)) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. (Error: #VC2)"));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User($db);

$user->name = $decoded->data->name;
$user->phoneNumber = $decoded->data->phoneNumber;

$user->fingerprint = $reqBody->fingerprint;

$hasAccess = $user->confirmAccess();

if (!$hasAccess) {
    http_response_code(401);
    echo json_encode(array("message" => "Não foi possível validar seu login, favor entrar em contato com o Administrador. (Error: #VC3)"));
    exit();
}

http_response_code(200);
echo json_encode(
    array(
        "message" => "Cookie validado com sucesso!",
        "name" => $user->name,
        "phoneNumber" => $user->phoneNumber,
        "role" => $user->role,
        "jwt" => $jwt,
    )
);
?>