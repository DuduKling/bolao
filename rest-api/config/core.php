<?php
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Asia/Manila');
 
// variables used for jwt
$key = "Ldki43YT7zP3wrY";
$iss = "https://bolaodogui.000webhostapp.com";    //"iss" (Issuer) Claim
$aud = "https://bolaodogui.000webhostapp.com";    //"aud" (Audience) Claim
// $iat = 1356999524;
$iat =  time();  //"iat" (Issued At) Claim
$nbf = $iat + 1;  //"nbf" (Not Before) Claim
$exp = $iat + 604800;   // Expire
?>