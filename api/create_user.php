<?php
include_once 'config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$inputData = json_decode(file_get_contents("php://input"));

include_once 'config/database.php';
$db = new DatabaseConnection($env);

include_once 'objects/user.php';
$user = new User($db);

$user->completename = $inputData->completename;
$user->email = $inputData->email;
$user->password = $inputData->password;

$emailExists = $user->CheckIfEmailExists();

if ($emailExists) {
    http_response_code(400);
    echo json_encode(array("message" => "Este email já está sendo utilizado."));
    exit();
}

$userCreated = $user->create();

if (!$userCreated) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível criar seu usuário. Favor entrar em contato com o Administrador."));
    exit();
}

http_response_code(200);
echo json_encode(array("message" => "Usuário criado com sucesso!"));
?>