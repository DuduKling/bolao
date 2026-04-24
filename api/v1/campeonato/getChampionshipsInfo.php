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

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/objects/pool.php';
$pool = new Pool();
$championshipsInfo = $pool->getChampionshipsInfo();

http_response_code(200);
echo json_encode(array(
    "championshipsInfo" => $championshipsInfo,
));
