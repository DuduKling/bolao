<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

#################### Validate jwt token ####################
if (!isset($_POST["jwt"]) || empty($_POST["jwt"])) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente. (Error: #UUA1)"));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $_POST["jwt"];
$decoded = $customJWT->decodeToken($jwt);

if (empty($decoded)) {
    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente. (Error: #UUA2)"));
    exit();
}

#################### Validate file ####################
$fileIsValid = true;

if ($_FILES["file"]["size"] > 500000) {
    $fileIsValid = false;
}

$imageFileType = strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION));
$availableFileTypes = array("jpg", "png", "jpeg", "gif");
if (!in_array($imageFileType, $availableFileTypes)) {
    $fileIsValid = false;
}

if (!$fileIsValid) {
    http_response_code(400);
    echo json_encode(array("message" => "Formato ou tamanho do arquivo indisponíveis para upload. (Error: #UUA3)"));
    exit();
}

#################### Validate upload ####################
$upFile = $_FILES['file'];

$error = (int) $upFile['error'];
if ($error != 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Problemas ao enviar o arquivo para o servidor, favor entrar em contato com o Administrador. (Error: #UUA4)"));
    exit();
}

$tmpName = $upFile['tmp_name'];

$fileName = $upFile['name'];
$fileNamePieces = explode(".", $fileName);
$finalFileName = $env["UPLOAD_DIR"] . $fileNamePieces[0] ."-".time(). ".".$fileNamePieces[1];

$fileUploaded = move_uploaded_file($tmpName, $_SERVER['DOCUMENT_ROOT'] . $finalFileName);

if (!$fileUploaded) {
    http_response_code(400);
    echo json_encode(array("message" => "Problemas ao mover o arquivo para o servidor, favor entrar em contato com o Administrador. (Error: #UUA5)"));
    exit();
}

#################### Update user ####################
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/user.php';
$user = new User($db);

$id = $decoded->data->id;
$foundUser = $user->find($id);

if (!$foundUser) {
    http_response_code(401);
    echo json_encode(array("message" => "Não foi possível atualizar o avatar, favor entrar em contato com o Administrador. (Error: #UUA6)"));
    exit();
}

$updated = $user->updateAvatar($finalFileName);

if (!$updated) {
    http_response_code(401);
    echo json_encode(array("message" => "Não foi possível atualizar seu avatar, favor entrar em contato com o Administrador. (Error: #UUA7)"));
    exit();
}

http_response_code(200);
echo json_encode(array(
    "message" => "Foto atualizada com sucesso!",
    "userImg" => $finalFileName 
));
?>