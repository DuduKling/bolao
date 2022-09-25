<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$inputData = json_decode(file_get_contents("php://input"));

if (!isset($inputData->jwt) || empty($inputData->jwt)) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente. (Error: #VC1)"));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $inputData->jwt;
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

$id = $decoded->data->id;
$foundUser = $user->find($id);

if (!$foundUser) {
    http_response_code(401);
    echo json_encode(array("message" => "Não foi possível validar as informações, favor entrar em contato com o Administrador. (Error: #VC3)"));
    exit();
}

http_response_code(200);
echo json_encode(
    array(
        "message" => "Cookie validado com sucesso!",
        "jwt" => $jwt,
        "name" => $user->completename,
        "email" => $user->email,
        "userImg" => $user->imagePath,
        "userRole" => $user->role,
        "id" => $user->id
    )
);
?>