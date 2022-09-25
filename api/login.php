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

$user->email = $inputData->email;

$emailExists = $user->CheckIfEmailExists();
$passwordMatch = password_verify($inputData->password, $user->password);

if (!$emailExists || !$passwordMatch) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível realizar o login. Email ou senha podem estar errados."
    ));
    exit();
}

include_once 'config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $customJWT->createToken(array(
    "id" => $user->id,
    "completename" => $user->completename,
    "email" => $user->email
));

echo json_encode(
    array(
        "message" => "Login efetuado com sucesso!",
        "jwt" => $jwt,
        "name" => $user->completename,
        "email" => $user->email,
        "imagePath" => $user->imagePath,
        "userRole" => $user->role,
        "id" => $user->id
    )
);
?>