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
$passwordMatch = $user->matchPassword($reqBody->fingerprint);

if (!$userExists || !$passwordMatch) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível realizar o login. Nome ou telefone podem estar errados. Este é um dispositivo diferente do que foi utilizado para criar o usuário? Tente novamente utilizando o link de \"Perdi o acesso\"."
    ));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $customJWT->createToken(array(
    "name" => $user->name,
    "phoneNumber" => $user->phoneNumber,
    "createdAt" => date(DATE_ATOM)
));

echo json_encode(
    array(
        "message" => "Login efetuado com sucesso!",
        "name" => $user->name,
        "phoneNumber" => $user->phoneNumber,
        "role" => $user->role,
        "jwt" => $jwt,
    )
);
?>