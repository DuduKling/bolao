<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
$env = new Env();

header("Access-Control-Allow-Origin: {$env->urlFront}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/auth.php';
$auth = new Auth();
$decoded = $auth->authenticate();

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
