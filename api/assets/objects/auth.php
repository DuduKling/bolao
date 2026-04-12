<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';

class Auth
{
    public function validateToken($jwt)
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
        $env = new Env();

        $customJWT = new CustomJWT($env);

        return $customJWT->decodeToken($jwt);
    }
}
