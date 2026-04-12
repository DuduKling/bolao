<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

class CustomJWT {
    public function __construct($env) {
        error_reporting(E_ALL);
        date_default_timezone_set($env->jwtTimezone);

        $this->pubKey = $env->jwtPubKey;
        $this->privKey = $env->jwtPrivKey;
        $this->iss = $env->urlFront; //"iss" (Issuer) Claim
        $this->aud = $env->urlFront; //"aud" (Audience) Claim

        $this->algorithm = 'RS256';
    }

    public function createToken($data) {
        $iat = time();

        $values = array(
            "iss" => $this->iss,
            "aud" => $this->aud,
            "iat" => $iat, //"iat" (Issued At) Claim
            "nbf" => $iat + 1, //"nbf" (Not Before) Claim
            "exp" => $iat + 604800, // Expire (7 dias dps)
            "data" => $data
        );

        return JWT::encode($values, $this->privKey, $this->algorithm);
    }

    public function decodeToken($token) {
        $decoded = null;

        try {
            $decoded = JWT::decode($token, new Key($this->pubKey, $this->algorithm));
        } catch (Exception $e) {
            return $decoded;
        }

        return $decoded;
    }
}
