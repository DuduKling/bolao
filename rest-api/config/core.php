<?php
// show error reporting
error_reporting(E_ALL);

// set your default time-zone
date_default_timezone_set($env["JWT_TIMEZONE"]);

// variables used for jwt
$key = $env["JWT_KEY"];
$iss = $env["URL_FRONT"];    //"iss" (Issuer) Claim
$aud = $env["URL_FRONT"];    //"aud" (Audience) Claim

$iat =  time();  //"iat" (Issued At) Claim
$nbf = $iat + 1;  //"nbf" (Not Before) Claim
$exp = $iat + 604800;   // Expire (7 dias dps)
?>