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
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente. (Error: #UU1)"));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $inputData->jwt;
$decoded = $customJWT->decodeToken($jwt);

if (empty($decoded)) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. (Error: #UU2)"));
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
    echo json_encode(array("message" => "Não foi possível atualizar as informações, favor entrar em contato com o Administrador. (Error: #UU3)"));
    exit();
}

$tipo = $inputData->type;

if ($tipo == "userPassword") {
    $password = $inputData->password;

    $updated = $user->updatePassword($password);

    if (!$updated) {
        http_response_code(401);
        echo json_encode(array("message" => "Não foi possível atualizar a sua senha, favor entrar em contato com o Administrador. (Error: #UU4)"));
        exit();
    }

    http_response_code(200);
    $jwt = $customJWT->createToken(array(
        "id" => $user->id,
        "completename" => $user->completename,
        "email" => $user->email
    ));
    echo json_encode(
        array(
            "message" => "Senha atualizada com sucesso!",
            "jwt" => $jwt,
            "name" => $user->completename,
            "email" => $user->email,
            "userImg" => $user->imagePath,
            "id" => $user->id
        )
    );
    exit();
}

if ($tipo=="userInfo") {
    $name = $inputData->name;
    $email = $inputData->email;

    $updated = $user->updateInfo($name, $email);

    if (!$updated) {
        http_response_code(401);
        echo json_encode(array(
            "message" => "Não foi possível atualizar as informações, favor entrar em contato com o Administrador. (Error: #UU5)",
            "name" => $user->completename,
            "email" => $user->email,
            "id" => $user->id
        ));
    }

    http_response_code(200);
    $jwt = $customJWT->createToken(array(
        "id" => $user->id,
        "completename" => $user->completename,
        "email" => $user->email
    ));
    echo json_encode(
        array(
            "message" => "Informações atualizadas!",
            "jwt" => $jwt,
            "name" => $user->completename,
            "email" => $user->email,
            "userImg" => $user->imagePath,
            "userRole" => $user->role,
            "id" => $user->id
        )
    );
}
?>