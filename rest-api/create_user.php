<?php
include_once 'config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';
$db = new DatabaseConnection($env);

include_once 'objects/user.php';
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->completename = $data->completename;
$user->email = $data->email;
$user->password = $data->password;

$email_exists = $user->CheckIfEmailExists();

if ($email_exists) {
    http_response_code(400);
    echo json_encode(array("message" => "Este email já está sendo utilizado."));
} else {
    if($user->create()){
        http_response_code(200);

        // display message: user was created
        // echo json_encode(array("firstname" => $data->firstname));
        // echo json_encode(array("lastname" => $data->lastname));
        // echo json_encode(array("email" => $data->email));
        // echo json_encode(array("password" => $data->password));
        echo json_encode(array("message" => "Usuário criado com sucesso!"));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Não foi possível criar seu usuário. Favor entrar em contato com o Administrador."));
    }
}
?>
