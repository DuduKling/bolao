<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

$reqBody = json_decode(file_get_contents("php://input"));

// --- JWT Validation ---
$jwt = htmlspecialchars($_COOKIE["userJWT"]);
$fingerprint = htmlspecialchars(strip_tags($reqBody->fingerprint));

if (!isset($jwt) || empty($jwt)) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Acesso Negado. Favor fazer login novamente. (Error: #AR1)"
    ));
    exit();
}

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();

$decoded = $auth->validateToken($jwt);
if (empty($decoded)) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Acesso Negado. (Error: #AR2)"
    ));
    exit();
}
// ---  END JWT Validation ---

$cookieOptions = array(
    "expires" => time() - 3600,
    "path" => "/",
    "domain" => 'localhost',
    "secure" => true,     // or false
    "httponly" => true,    // or false
    "samesite" => "Strict" // None || Lax  || Strict
);
setcookie("userJWT", "", $cookieOptions);

http_response_code(200);
